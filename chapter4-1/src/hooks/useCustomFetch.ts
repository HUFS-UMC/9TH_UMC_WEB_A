import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

type State<T> = {
  data: T | null;
  isPending: boolean;
  isError: boolean;
};

// dependencies를 제거하고 url과 options만 받도록 정의를 간소화합니다.
export function useCustomFetch<T>(
  url: string,
  options: AxiosRequestConfig = {} // options의 기본값을 설정
): State<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // url이 유효하지 않으면 요청을 보내지 않습니다.
      if (!url) return;

      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<T>(url, {
          ...options,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(data);
      } catch (error) {
        setIsError(true);
        console.error("데이터 패칭 중 에러 발생:", error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
    // url과 options이 바뀔 때마다 재요청합니다. (무한 루프를 막기 위해 options는 useMemo로 안정화 필요)
  }, [url, options]);

  return { data, isPending, isError };
}
