import {useState} from "react";
import useForm from "../hooks/useForm"
import { validateSignin, type UserSigninInformation } from "../utils/validate";

const LoginPage = () => {
    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = () => {
        console.log(values);
    };

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || Object.values(values).some((value) => value === "");
// 오류가 있으면 True
//입력값이 없으면 True
       
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps("email")}
                    name="email"
                    className="border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm"
                    type={"email"}
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input 
                    {...getInputProps("password")}
                    className="border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm"
                    type={"password"}
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button 
                type='button' 
                onClick={handleSubmit} 
                disabled={isDisabled} 
                className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-300 active:brightness-50 cursor-pointer">로그인</button>
            </div>

        </div>
    )
}

export default LoginPage;