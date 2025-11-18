import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // value, delay 변경 시마다 타이머 설정
  useEffect(() => {
    // delay 후에 value를 debouncedValue 업데이트
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // value가 변경되면 기존 타이머를 지워서 업데이트를 취소
    // 값이 바뀔때마다 마지막에 멈춘 값만 업데이트
    return () => clearTimeout(handler);
  }, [value, delay]);

  // 최종적으로 잠시 기다린 후의 값을 반환

  return debouncedValue;
}

export default useDebounce;
