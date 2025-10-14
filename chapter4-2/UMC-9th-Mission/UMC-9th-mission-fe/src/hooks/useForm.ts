import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T; // { email: '', password: ''}
  // 값이 올바른지 검증하는 함수
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>(); // 키값 문자열 벨류값 불리언
  const [errors, setErrors] = useState<Record<string, string>>(); // 이메일 @ 있는지 확인

  // 사용자가 입력값을 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 불변성 유지(기본 입력값 유지)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직 실행
  useEffect(() => {
    const newErrors: Record<keyof T, string> = validate(values);
    setErrors(newErrors); // 오류 시 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
