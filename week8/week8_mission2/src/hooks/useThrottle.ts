//useThrottle : 주어진 값이 자주 변경될 때
//최소 interval 간격으로만 업데이트 해서 성능을 개선함

import { useEffect, useRef, useState } from "react";
import { number } from "zod"

function useThrottle<T>(value:T, delay:number){
    //1. 상태 변수 : throttledValue : 최종적으로 쓰로틀링 적용된 값 저장
    //최기값을 전달받은 value
    const [throttleValue, setThrottleValue] = useState<T>(value);
    //2.Ref lastExecuted : 마짐가으로 실행된 시간을 기록하는 변수
    //useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지 않음
    const lastExecuted = useRef<number>(Date.now());
    //3. useEffect : value나 delay가 변경될 때 아래 로직 실행
    useEffect(() => {
        //현재 시각과 lastExecuted.current에 저장된 마지막 시각 + dealy를 비교
        //충분한 시간이 지나면 바로 업데이트
        if(Date.now() >= lastExecuted.current + delay){
            //현재 시간이 지난 경우
            //현재 시각으로 lastExecuted 업데이트
            lastExecuted.current = Date.now();
            //최신 value를 throttleValue에 저장해서 컴포넌트 리렌더링
            setThrottleValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
                //최신 value를 throttleValue에 저장해서 컴포넌트 리렌더링
                setThrottleValue(value);
            }, delay);
            //CleanUp Function 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면
            //기존 타이머를 clearTimout을 통해 취소하여 중복 업데이트를 방지함
            return () => clearTimeout(timerId);
        }
    }, [value, delay]);

    return throttleValue
}

export default useThrottle;