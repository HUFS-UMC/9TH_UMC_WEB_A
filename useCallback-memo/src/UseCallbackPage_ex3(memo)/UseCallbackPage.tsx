import { useState, useCallback } from "react";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
      // 빈 비열은 이 함수가 처음 한번만 만들어져야 한다.
      //함수 내부에서 count값은 0으로 기억
      //두번쨰 클릭을 해도, 0+10이 되어서 count값이 변하지 않고
      //첫번째 클릭도 0+10
      //두번쨰 클릭도 0+10
    },
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);
  //같은말
  //const [text,setText] = useState<string>('');
  // const handleText= (text:string)=> {
  //     setText(text);
  // };

  return (
    <div>
      <h1>같이 배우는 리엑트 useCallback편</h1>
      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <h2>Text</h2>

      <div className="flex flex-col">
        <span>{text}</span>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
}

//제네릭 문법 :“이 state는 number 타입으로만 다룰 거야!”
//제네릭 문법을 쓰지 않으면? 이 경우 TypeScript가 초기값의 타입을 보고 자동 추론함.
//근데 명시적으로 적으면 더 안전하니까 쓰는 것.
