import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";


export default function useCustomFetch<T>(
  url: string | null,
  config?: AxiosRequestConfig,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tick, setTick] = useState(0); // refetch 트리거

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    let mounted = true;
    const controller = new AbortController();

    (async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const res = await axios.get<T>(url, {
          ...(config ?? {}),
          signal: controller.signal,
        });
        if (mounted) setData(res.data ?? null);
      } catch (err: any) {
        // 취소는 에러로 처리하지 않음
        if (axios.isCancel?.(err) || err?.name === "CanceledError") return;
        if (mounted) setIsError(true);
      } finally {
        if (mounted) setIsPending(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [url, tick, ...(deps ?? [])]);

  const refetch = () => setTick((t) => t + 1);

  return { data, isPending, isError, refetch };
}
