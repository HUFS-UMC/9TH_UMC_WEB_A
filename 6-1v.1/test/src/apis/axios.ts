// src/api/axios.ts
import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
// import { useLocalStorage } from "../hooks/useLocalStorage"; // ← 인터셉터 밖에서는 훅 사용 X
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

/* ---------------------- 작은 변경 1: localStorage 유틸 ---------------------- */
const ls = {
  get(key: string) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, val: string) {
    try { window.localStorage.setItem(key, val); } catch {}
  },
  remove(key: string) {
    try { window.localStorage.removeItem(key); } catch {}
  },
};
/* ------------------------------------------------------------------------- */

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 전역 변수로 refresh 요청의 promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "/",
  // 예: http://localhost:3001 또는 http://localhost:8000
});

/* ---------------------- 작은 변경 2: refresh 전용 클라이언트 ---------------------- */
// 인터셉터가 없는 별도 인스턴스 (자기 자신 401 무한루프 방지)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "/",
  withCredentials: true,
});
const REFRESH_PATH = "/v1/auth/refresh";
/* ----------------------------------------------------------------------------- */

// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    // const accessToken = getItem();
    const accessToken = ls.get(LOCAL_STORAGE_KEY.accessToken);

    if (accessToken) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use(
  // (1) 응답 성공 시
  (response) => response,

  // (2) 응답 실패 시
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;
    const status = error.response?.status;

    if (!status) return Promise.reject(error);

    // 401 에러면서 아직 재시도하지 않은 경우
    if (status === 401 && originalRequest && !originalRequest._retry) {
      // refresh 엔드포인트 자체가 401이면 → 로그아웃
      const url = originalRequest.url || "";
      if (url.endsWith(REFRESH_PATH) || url.includes(REFRESH_PATH)) {
        ls.remove(LOCAL_STORAGE_KEY.accessToken);
        ls.remove(LOCAL_STORAGE_KEY.refreshToken);
        window.location.replace("/login");
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 refresh 요청이 진행 중이면 그 promise 재사용
      if (!refreshPromise) {
        refreshPromise = (async () => {
          // const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          // const refreshToken = getRefreshToken();
          const refreshToken = ls.get(LOCAL_STORAGE_KEY.refreshToken);

          if (!refreshToken) {
            ls.remove(LOCAL_STORAGE_KEY.accessToken);
            ls.remove(LOCAL_STORAGE_KEY.refreshToken);
            window.location.replace("/login");
            throw new Error("No refresh token");
          }

          // *** 작은 변경 3: refresh는 인터셉터 없는 클라이언트로 호출 ***
          const { data } = await refreshClient.post(REFRESH_PATH, {
            refresh: refreshToken,
          });

          // 서버 응답 스키마에 맞게 조정할 것
          const newAccess = (data as any)?.data?.accessToken;
          const newRefresh = (data as any)?.data?.refreshToken;

          if (!newAccess || !newRefresh) {
            throw new Error("Invalid refresh response");
          }

          // const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          // const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          // setAccessToken(newAccess);
          // setRefreshToken(newRefresh);
          ls.set(LOCAL_STORAGE_KEY.accessToken, newAccess);
          ls.set(LOCAL_STORAGE_KEY.refreshToken, newRefresh);

          return newAccess as string;
        })()
          .catch((e) => {
            // const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            // const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            // removeAccessToken();
            // removeRefreshToken();
            ls.remove(LOCAL_STORAGE_KEY.accessToken);
            ls.remove(LOCAL_STORAGE_KEY.refreshToken);
            window.location.replace("/login");
            throw e;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // refreshPromise가 완료될 때까지 기다렸다가 재시도
      const newAccessToken = await refreshPromise;
      if (newAccessToken) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      }
    }

    // 다른 에러는 그대로 reject
    return Promise.reject(error);
  }
);
