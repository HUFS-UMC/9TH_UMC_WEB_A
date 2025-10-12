import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

// axios 인스턴스 생성 (기본 헤더에 로컬 스토리지 토큰을 넣음)
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});

// 요청 인터셉터로 토큰을 최신값으로 동기화
axiosInstance.interceptors.request.use((config) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const token = getItem();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
