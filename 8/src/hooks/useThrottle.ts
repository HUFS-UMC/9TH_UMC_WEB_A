// useThrottle : 주어진 값 상태가 자주 변경될 때
// 최소 interval마다 한 번만 최신 값으로 업데이트되도록 하는 커스텀 훅

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number): T {
  // 1. 상태 변수 : throttledValue : 최종적으로 쓰로틀링 적용된 값
  // 초기값을 전달 받은 value로 설정
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. 참조 변수 : lastExecutedRef : 마지막으로 값이 업데이트된 시점 저장
  // useRef를 사용하여 값이 변경되어도 컴포넌트가 재렌더링되지 않도록 함
  const lastExecutedRef = useRef<number>(Date.now());

  // 3. useEffect : value 또는 delay가 변경될 때마다 실행
  useEffect(() => {
    // 현재 시각과 마지막 실행 시점의 차이 계산
    // 충분한 시간이 지나면 바로 업데이트
    if (Date.now() >= lastExecutedRef.current + delay) {
      // 현재 시간이 지난 경우,
      // 현재 시각으로 lastExecutedRef.current 업데이트
      lastExecutedRef.current = Date.now();
      // 최신 value로 throttledValue 상태 업데이트
      setThrottledValue(value);
    } else {
      // 충분한 시간이 지나지 않은 경우, delay 후에 업데이트 예약
      const timerld = setTimeout(() => {
        // 타이머가 만료되면 마지막 업데이 시간을 현재 시간으로 갱신
        lastExecutedRef.current = Date.now();
        // 최신 value로 throttledValue 상태 업데이트
        setThrottledValue(value);
      }, delay);

      // CleanUp Function 이팩트가 재실행 되기 전 타이머 실행 x 라면
      // 기존 타이머를 clearTimeout으로 제거하여 중복 방지
      return () => clearTimeout(timerld);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
