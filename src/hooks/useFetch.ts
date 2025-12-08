import type { AxiosRequestConfig } from "axios"; // 혹은 import type ...
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url: string | null, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // 1. URL이 없으면(null, 빈문자열 등) 아예 요청을 하지 않음 (방어 코드)
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosClient.get(url, {
          ...options,
        });

        setData(data);
        setError(null); // 성공하면 에러 초기화
      } catch (err: any) {
        // 2. 콘솔에 진짜 에러를 출력해서 원인 파악
        console.error("API 요청 실패:", err);
        // 3. 에러 메시지가 있으면 그걸 보여주고, 없으면 기본 메시지
        setError(err.message || "에러 발생");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // url이 바뀔 때마다 실행

  return { data, error, isLoading };
};

export default useFetch;
