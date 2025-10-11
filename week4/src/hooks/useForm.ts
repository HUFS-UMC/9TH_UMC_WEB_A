import { useEffect, useReducer, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValue: T;
    //값이 올바른지 검증하는 함수
    validate: (values: T) => Record<keyof Text, string>;

}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>(); //key값은 string, value값은 boolean
    const [errors, setErrors] = useState<Record<string, string>>();

    //사용자가 입력값을 바꿀 때 실행되는 함수다.
    const handleChange = (name:keyof T, text:string) => {
        setValues({
            ...values, //불변성 유지(기존 값 유지)
            [name]: text,
        });
    };

    const handleBlur = (name:keyof T) => {
        setTouched({
            ...touched, //불변성 유지(기존 값 유지)
            [name]: true,
        });
    };

    const getInputProps = (name: keyof T) => {
        const value : T[keyof T] = values[name];

        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur}
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors); //오류 메시지 업뎃
    }, [validate, values]);

    return { values, errors, touched, getInputProps };
}