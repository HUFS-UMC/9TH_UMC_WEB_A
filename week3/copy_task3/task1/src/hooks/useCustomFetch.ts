import { useEffect, useMemo, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

type UseCustomFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export default function useCustomFetch<T>(
  config: AxiosRequestConfig,
  deps: unknown[] = []
): UseCustomFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const memoConfig = useMemo(() => ({
    url: config.url,
    params: config.params,
    headers: config.headers,
    method: config.method ?? "GET",
    data: config.data,
  }), [
    JSON.stringify({
      url: config.url,
      params: config.params,
      headers: config.headers,
      method: config.method,
      data: config.data,
    }),
  ]);

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await axios.request<T>({
        ...memoConfig,
        signal: controller.signal,
      });
      setData(res.data);
    } catch (err) {
      if (axios.isCancel(err)) return;
      const e = err as AxiosError<any>;

      const status = e.response?.status;
      const serverMessage =
        (e.response?.data && (e.response.data.message || e.response.data.error)) ??
        e.response?.statusText;
      const defaultMessage = e.message || "요청 중 오류가 발생했습니다.";

      // 에러 메시지를 좀 더 구체적으로 구성
      const errorMessage = status
        ? `[${status}] ${serverMessage || defaultMessage}`
        : defaultMessage;

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [JSON.stringify(memoConfig), ...deps]);

  return { data, isLoading, error, refetch: fetchData };
}
