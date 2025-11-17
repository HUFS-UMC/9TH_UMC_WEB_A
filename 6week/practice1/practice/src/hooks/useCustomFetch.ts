import { useEffect, useMemo, useRef, useState } from "react";
const STALE_TIME = 5*60*1000;
interface CacheEntry<T>{
  data: T;
  lastFetched: number; //마지막으로 데이터를 가져온 시점 타임스탬프
}

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1_000;
export const useCustomFetch = <T>(url: string): { data: T | null; isPending: boolean; isError: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const storageKey = useMemo(() : string => url, [url])// url이 바뀔 때마다 값을 저장시켜

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect((): void => {
    const fetchData = async (currentRetry = 0): Promise<void> => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      //캐시 데이터 확인 및 신선도 검증
      if (cachedItem) {
        try{
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          //캐시가 신선한 경우
          if(currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log('캐시된 데이터 사용', url);
            return;
          }

          //캐시가 만료된 경우
          setData(cachedData.data);
          console.log('만료된 캐시 데이터 사용', url);
          
        } catch{
          localStorage.removeItem(storageKey);
          console.warn('캐시 에러: 캐시 삭제함', url);
        }
      }







      setIsError(false);
      setIsPending(true);
      abortControllerRef.current = new AbortController(); // ✅ 새 컨트롤러 생성
      try {

        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry))
      } catch (error) {

        if(error instanceof Error && error.name === 'AbortError'){
          console.log('요청 취소됨', url);

          return;
        }

        if(currentRetry < MAX_RETRIES) {
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(
            `재시도, ${
              currentRetry + 1
            }/${MAX_RETRIES} Retrying ${retryDelay}ms later`
          );
          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          setIsError(true);
          setIsPending(true);
          console.log('최대 시도 횟수 초과', url);
          return
        }
        setIsError(true);
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if(retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }
  }, [url, storageKey]);

  return { data, isPending, isError };
};

