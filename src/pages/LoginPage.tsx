import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../costants/key";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
  const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    register,
    handleSubmit, // ✅ react-hook-form 기본 함수 그대로 사용
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    try {
      console.log("로그인 시도:", data);

      const response = await postSignin(data); // ✅ 여기가 핵심
      console.log("로그인 성공:", response);
      setItem(response.data.accessToken);
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.");
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
      </div>
    </form>
  );
};

export default LoginPage;
