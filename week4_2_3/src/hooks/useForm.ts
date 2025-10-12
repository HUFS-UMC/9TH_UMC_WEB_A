import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T; //email, password
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  // 입력값 변경 처리기 - 제네릭 타입으로 어떤 폼에도 재사용 가능하도록 구현
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  // blur 이벤트 발생 시 touched 상태를 업데이트
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 바뀔 때마다 유효성 검사 함수를 실행해 errors를 갱신
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);
  return { values, errors, touched, getInputProps };
}

export default useForm;
