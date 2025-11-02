// useForm.ts
import { ChangeEvent, useEffect, useState } from "react";

export interface UseFormProps<T extends Record<string, any>> {
  // 초기 값
  initialValue: T;
  // 값 -> 에러메시지 매핑(없으면 key를 생략)  ex) { email: "형식 오류" }
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

export default function useForm<T extends Record<string, any>>({
  initialValue,
  validate,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] =
    useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] =
    useState<Partial<Record<keyof T, string>>>({});

  // 입력값 변경
  const handleChange = (name: keyof T, text: string) => {
    setValues(prev => ({ ...prev, [name]: text }));
  };

  // 포커스 아웃(blur) → 해당 필드 터치 처리
  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // 인풋에 바로 바인딩할 프롭들 제공
  const getInputProps = (name: keyof T) => {
    const value = values[name] as T[keyof T];

    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      handleChange(name, e.target.value);
    };

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur, name: String(name) };
  };

  // values가 바뀔 때마다 검증 실행
  useEffect(() => {
    const newErrors = validate(values) ?? {};
    setErrors(newErrors);
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
   setTouched,
    getInputProps,  // 인풋 바인딩용 편의 함수
  };
}
