import { useState } from "react";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = (number: number) => {
    setCount(count + number);
  };

  const handleText = (text: string) => {
    setText(text);
  };
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
