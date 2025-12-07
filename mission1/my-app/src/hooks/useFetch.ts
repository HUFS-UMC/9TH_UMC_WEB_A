import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //url.options이 바뀔때마다 useEffect가 실행되기를 바란다.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosClient.get(url, { ...options });
      } catch {
        ("데이터를 가져오는데 에러가 발생했습니다.");
      } finally {
      }
    };
    fetchData();
  }, []);

  return { data, error, isLoading };
};

export default useFetch;
