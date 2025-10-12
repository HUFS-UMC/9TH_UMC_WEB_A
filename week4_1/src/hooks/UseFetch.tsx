import { useEffect, useRef, useState } from "react";

type UseFetchResult<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
    errorMessage?: string | null;
    status?: number | null;
    statusText?: string | null;
    refetch: () => void;
};

/**
 * useFetch - 간단한 데이터 패칭 훅
 * 반환값: { data, loading, error, errorMessage, status, statusText, refetch }
 * - url이 falsy하면 요청을 보내지 않습니다.
 * - 내부적으로 AbortController로 취소 처리를 합니다.
 */
function useFetch<T = unknown>(
    url?: string | null,
    deps: any[] = [],
    options?: RequestInit
): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [statusText, setStatusText] = useState<string | null>(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    const abortRef = useRef<AbortController | null>(null);

    const refetch = () => setRefetchIndex((i) => i + 1);

    useEffect(() => {
        if (!url) return;

        // abort previous
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setErrorMessage(null);
            setStatus(null);
            setStatusText(null);
            try {
                const res = await fetch(url, { signal: controller.signal, ...(options || {}) });
                // capture status/meta
                setStatus(res.status);
                setStatusText(res.statusText || null);

                const text = await res.text();
                const tryParseJson = () => {
                    try {
                        return text ? JSON.parse(text) : null;
                    } catch {
                        return null;
                    }
                };
                const parsed = tryParseJson();

                if (!res.ok) {
                    const serverMessage = parsed && typeof parsed === 'object' && 'message' in parsed ? String((parsed as any).message) : null;
                    const err = new Error(serverMessage || `HTTP error! status: ${res.status}`);
                    if (serverMessage) setErrorMessage(serverMessage);
                    if (!mounted) return;
                    setError(err);
                    return;
                }

                const json = (parsed ?? null) as T;
                if (!mounted) return;
                setData(json);
            } catch (err: any) {
                if (err?.name === "AbortError") return;
                if (!mounted) return;
                const finalError = err instanceof Error ? err : new Error(String(err));
                setError(finalError);
                setErrorMessage(finalError.message);
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            mounted = false;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, refetchIndex, ...deps]);

    return { data, loading, error, errorMessage, status, statusText, refetch };
}

export default useFetch;