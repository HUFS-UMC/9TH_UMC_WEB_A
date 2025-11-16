// src/apis/axios.ts
import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";
import type { AxiosRequestHeaders } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

/** 원요청에 1회 재시도 플래그를 달기 위한 타입 확장 */
interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/** 서버 refresh 응답 타입(백엔드 스펙에 맞게 조정) */
type RefreshResponse = { accessToken: string; refreshToken?: string };

const API_BASE = import.meta.env.VITE_SERVER_API_URL as string;
const REFRESH_PATH = "/v1/auth/refresh";

/* ----------------------------- 인스턴스 ----------------------------- */
export const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 15_000,
  withCredentials: true, // 쿠키 기반 리프레시 사용 시 true
  headers: { "Content-Type": "application/json" },
});

/* ----------------------------- 유틸 ----------------------------- */
const getAccessToken = (): string | null => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    return raw ? (JSON.parse(raw) as string) : null;
  } catch {
    return raw;
  }
};
const getRefreshToken = (): string | null => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
  try {
    return raw ? (JSON.parse(raw) as string) : null;
  } catch {
    return raw;
  }
};
const setAccessToken = (t: string): void =>
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(t));
const setRefreshToken = (t: string): void =>
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, JSON.stringify(t));
const clearTokens = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};

/** headers를 항상 AxiosHeaders로 정규화 */
const asAxiosHeaders = (
  headers?: AxiosRequestHeaders | AxiosHeaders
): AxiosHeaders => AxiosHeaders.from(headers ?? {});

/* --------------------------- 요청 인터셉터 --------------------------- */
axiosInstance.interceptors.request.use((config) => {
  const isRefreshReq =
    config.url?.startsWith(REFRESH_PATH) || config.url?.includes(REFRESH_PATH);

  if (!isRefreshReq) {
    const at = getAccessToken();
    const h = asAxiosHeaders(
      config.headers as AxiosRequestHeaders | AxiosHeaders | undefined
    );

    if (at) h.set("Authorization", `Bearer ${at}`);
    else h.delete("Authorization");

    config.headers = h; // 반드시 AxiosHeaders로 되돌려 넣기
  }
  return config;
});

/* -------------------- refresh 단일화(중복 요청 방지) ------------------- */
let refreshPromise: Promise<string> | null = null;

const callRefresh = async (): Promise<string> => {
  const client = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const rt = getRefreshToken();
  const body = rt ? { refreshToken: rt } : undefined; // 서버가 쿠키만 쓰면 body 생략

  const { data } = await client.post<RefreshResponse>(REFRESH_PATH, body);

  setAccessToken(data.accessToken);
  if (data.refreshToken) setRefreshToken(data.refreshToken);

  return data.accessToken;
};

/* --------------------------- 응답 인터셉터 --------------------------- */
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetriableConfig | undefined;

    // 401이 아니거나, 원요청이 없거나, 이미 재시도한 요청이면 그대로 실패
    if (status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    // refresh 요청 자체가 실패한 경우(무한 루프 방지)
    const isRefreshFail =
      original.url?.startsWith(REFRESH_PATH) ||
      original.url?.includes(REFRESH_PATH);
    if (isRefreshFail) {
      clearTokens();
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      original._retry = true;

      // 동시 401 → refresh 한 번만 수행
      if (!refreshPromise) {
        refreshPromise = callRefresh().finally(() => {
          refreshPromise = null;
        });
      }
      const newAT = await refreshPromise;

      // 새 토큰으로 원요청 재시도
      const h = asAxiosHeaders(
        original.headers as AxiosRequestHeaders | AxiosHeaders | undefined
      );
      h.set("Authorization", `Bearer ${newAT}`);
      original.headers = h;

      return axiosInstance(original);
    } catch (e) {
      clearTokens();
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/login";
      return Promise.reject(e);
    }
  }
);
