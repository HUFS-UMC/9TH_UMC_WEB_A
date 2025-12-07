import { useState } from "react";

function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 1_000_999_999; i++) {
    result += i;
  }
  return result;
}

export default function UseCallbackPage() {
  const [count, setCount] = useState(heavyComputation()); //*lazy initializer: 함수의 참조를 던져줄경우 무거운 렌더링을 하는 것을 초기에 한번만실행
  const handleIncrease = () => {
    console.log("increase");
    setCount((prev): number => prev + 1); //prec는 현재 count값! 최초의 count값
  };

  return (
    <>
      <h3>{count}</h3>
      <button onClick={handleIncrease}>증가</button>
    </>
  );
}

//[위 코드의 작동흐름]
//1. react가 useState를 만나기도 전에 js엔지이 먼저 heavyComputation()을 실행
//실행 됨 → 1~10억 루프 돌면서 result 값 계산 → 리턴값 반환.
//UseCallbackPage() 실행 시작
// └─ useState(heavyComputation()) ← () 때문에 즉시 호출됨
//       └ heavyComputation() 실행 (매우 무거움)

//2.heavyComputation()의 “실행 결과값”이 useState의 초기값으로 들어감
//그냥 숫자 값(예: 5000000000000 같은 큰 수)

//3.컴포넌트가 리렌더링될 때마다 ❌ 또 다시 UseCallbackPage() 전체 함수가 실행됨

//setCount가 호출되어 state 값이 변함
//react의 판단: state 변경됨 → 컴포넌트 다시 그려야 함”
//그래서 UseCallbackPage() 함수 전체를 다시 호출한다.->heavyComputation 함수 실행
//heavyComputation()이 완전히 끝남 → 숫자 하나를 반환함
//이 값이 useState의 “초기값 자리에” 전달됨->React는 이 “초기값”을 무시한다
//useState의 초기값은 오직 첫 렌더에서만 사용한다.
// 그 다음 렌더부터 count는 setCount로 저장한 값만 유지함(setCount((prev): number => prev + 1);)

//위코드 흐름 최종정리
//최초렌더 :heavyComputation() → count 초기값 계산 → 화면 렌더링
//두번째 렌더 : 버튼 클릭: {count}:최초렌더에서 말한 count 초기값 계산 + 1 이 들어가는데 setcount가 호출되는것 state값이 바꼈음을 의미함으로 전체컴포넌트UseCallbackPage.tsx를 다시그리는것이고 그면 처음부터 다시 시작하니깐 useState(heavyComputation())가 실행되는데 실제 count에 들어가는 값은 이게 아니라  setCount((prev): number => prev + 1) 값

//[useState강의 복습]
//문제: 함수의 결과를 넣을떄 heavyComputation():이 코드가 렌더될 때마다 heavyComputation()이 호출됨 → 성능 폭발

//해결책: lazy initializer(초기값을 계산하는 함수"를 넘겨서 초기 렌더에서 딱 한 번만 실행하게 하는 패턴)ex) 함수 참조 , 콜백함수
//1)함수의 참조
//const [value, setValue] = useState(heavyComputation);

//2)콜백함수
//const [value, setValue] = useState(() => heavyComputation());
