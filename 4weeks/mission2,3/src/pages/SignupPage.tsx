import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth"; // ★ 수정: API 임포트 추가

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // ★ 수정: async 추가 (await 사용 가능하게)
  const onSubmit: SubmitHandler<FormFields> = async (data) => { 
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest); // ★ 수정: await 정상 동작
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        noValidate
      >
        {/* 이름 */}
        <input
          {...register("name")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="text"
          placeholder="이름"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        {/* 이메일 */}
        <input
          {...register("email")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        {/* 비밀번호 */}
        <input
          {...register("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        {/* 비밀번호 확인 */}
        <input
          {...register("passwordCheck")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.passwordCheck
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호 확인"
        />
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
