import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
  const {login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken) {
      navigate("/")
    }
  }, [navigate, accessToken]);
  const {
    register,
    handleSubmit, // ✅ react-hook-form 기본 함수 그대로 사용
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const handleGoogleLogin = () => {
    window.location.href = 
    import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
  }
  const onSubmit = async (data: FormFields) => {
    try{
      await login(data);
    }
    catch{
      alert("로그인 실패");
    }
  };

  const isDisabled = Object.values(errors || {}).some(
    (error) => error?.message?.length > 0
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // ✅ react-hook-form의 handleSubmit 사용
      className="flex flex-col items-center justify-center h-full gap-4"
    >
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          placeholder="이메일"
          type="email"
        />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          placeholder="비밀번호"
          type="password"
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
        <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isDisabled}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          <div className="flex items-center justify-center gap-4">
            <img className="w-8 h-8"
            src={'/images/google.png'} alt="Google Logo Image"/>
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
