//useTrottle: 주어진 값(상태)가 자주 변경될 때
//최소 interval(밀리초) 간격으로만 업데이트 해서 성능을 개선한다.

import { useEffect, useRef, useState } from "react";

function useTrottle<T>(value: T, delay = 500): T {
    //1.상태변수: throttleValue : 최종적으로 쓰로틀링 적용된 값 
    //초기값을 전달받은 value 전달받은 value를 이런 형태를 통해서 다룬다
    const[throttleValue, setThrottleValue] = useState<T>(value);
    //2. Ref lastExcuted : 마지막으로 실행된 시간을 기록하는 변수
    //useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지않아요.
    // 즉, 다시말해서 ref를 사용하는 것이 값이 변해도 리렌더링을 유발하지 않게 하기 위해서
    const lastExcuted = useRef<number>(Date.now());
    //3. useEffect: 마지막으로 실행된 시간을 기록하는 변수
    useEffect(() => {
        //현재 시각과 lastExcuted.current에 저장된 마지막 시간 + delay를 비교합니다.
        //충분한 시간이 지나면 바로업데이트
        if (Date.now() >= lastExcuted.current + delay) {
            //현재 시간이 지난 경우, delay가 경과한 순간
            //현재 시간으로 lastExcuted 업데이트
            lastExcuted.current = Date.now();
            //최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
            //delay경과 했기에 업데이트가 필요함
            setThrottleValue(value);

        } else {
            //충분한 시간이 지나지 않은 경우, delay 시간 후에 업데이트 (최신 value로)
            const timerid = setTimeout(() => {
                //타이머가 만료되면, 마지막 업데이트 시간을 현재 시각으로 갱신합니다.
                lastExcuted.current = Date.now();
                //최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
                setThrottleValue(value);
            }, delay)
            //CleanUp Function 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면
            //기존 타이머를 clearTimeout을 통해 취소하여 중복 업데이트를 방지합니다.
            //쉽게 말해서 타이머가 중첩되는 것을 막아주고 가장 마지막의 타이머만 돌아가게 해줌
            //왜? 중첩을 막지 않으면 이 usethrottle사용하는 의미가 없음
            return () => clearTimeout(timerid);
        }
    }, [value, delay])

    return throttleValue
}

export default useTrottle;

