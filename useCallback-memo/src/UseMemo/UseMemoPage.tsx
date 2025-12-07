import { useState, useMemo } from "react";
import TextInput from "./components/TextInput";
import { findPrimeNumbers } from "./utils/math";

export default function UseMemoPage() {
  console.log("render");
  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  // const primes = findPrimeNumbers(limit); 얘는 한번만 연산하고 더이상 할필요 없을 거같다는 생각이들떄 usememo를 쓰자

  const primes = useMemo((): number[] => findPrimeNumbers(limit), [limit]); //초기렌더링을 할떄 이 값에 대해 한번 캐싱이 일어남.

  return (
    <div className="flex flex-col gap-4 h-dvh">
      <h1>같이 배우는 리엑트:useMemo</h1>

      <label>
        숫자입력(소수찾기):
        <input
          value={limit}
          className="border p-4 rounded-lg"
          onChange={(e): void => setLimit(Number(e.target.value))}
        />
      </label>

      <h2>소수리스트</h2>
      <div className="flex flex-wrap">
        {primes.map((prime) => (
          <div key={prime}>{prime}&nbsp;</div>
        ))}
      </div>

      <label>
        {text}
        다른입력테스트:
        <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
}

//onChange={(e): void => setLimit(Number(e.target.value))}
//e:void = 이 함수는 리턴값이 없다.
// e.target.value;
//e:입력값같은 이벤트 정보 덩어리
//e.target → input 태그 자체(<input
//   type="number"
//   value={limit}
//   className="border p-4 rounded-lg"
//   onChange={(e): void => setLimit(Number(e.target.value))}
// />)
//e.target.value:사용자가 input에 입력한 실제 문자열 값
