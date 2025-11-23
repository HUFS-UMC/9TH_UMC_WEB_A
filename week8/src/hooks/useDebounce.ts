import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // value, dealy 변경될 때마다 실행
  useEffect(() => {
    // delay시간 후에 실행된다..
    // delay시간 후에 value를 debounced Value로 업데이트 하는 타이머를 시작.
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // value가 변경되면 기존 타이머를 지워서 업데이트 취소
    // 값이 바뀔 때 마다 마지막에 멈춘 값만 업데이트
    return () => clearTimeout(handler);
  }, [value, delay]);
  // 최종적으로 setDebouncedValue 값을 반환
  return debouncedValue;
}

export default useDebounce;
