import { useState, useEffect } from "react"; 
import type { ChangeEvent } from "react"; // ✅ 타입 전용 import


// 1️⃣ 제네릭 타입 정의
interface UseFormProps<T> {
  initialValue: T; // 예: { email: '', password: '' }

  // 2️⃣ 값이 올바른지 검증하는 함수
  // 반환값은 { email: '에러메시지', password: '에러메시지' } 형태
  //validate는 initialValue가 값을 넘겨주면 initalvalue가 값이 올바른지 체크하는것
  validate: (values: T) => Record<keyof T, string>;
}

// 3️⃣ 커스텀 훅 정의
// 앞에 interface에서 제네릭으로 값을 넘겨 줬으니깐 제네릭으로 받는다.
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);

  // 이메일 아무것도 안쳤는데 "이메일 에러"이런거 뜨는 거 방지하는것
  //key:문자열, values:boolean
  //{"email":false,"password":true}
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  //에러 메세지를 출력해주는 부분
  // {"email":"이메일은 반드시 를 포함한다"}
  const [errors, setErrors] = useState<Record<string, string>>({});

  //사용자가 입력값을 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지(기존값 유지)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({ ...touched, [name]: true });
  };
  // 이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);
    const onBlur = () => handleBlur(name);
    return { value, onChange, onBlur };
  };

  //values가 변경될 떄마다 에러 검증 로직이 실행됨
  // {email: ""}
  //validate,values가 바뀔떄마다 useEffect가 실행되돌록
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 매새지 없댓
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;


// 공용 단일 다 범용적으로 많이 쓰이는것 코드의 중복성 한방에 고치는것