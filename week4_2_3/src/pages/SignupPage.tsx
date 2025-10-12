import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상" })
      .max(20, { message: "비밀번호는 20자 이하" }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상" })
      .max(20, { message: "비밀번호는 20자 이하" }),

    name: z.string().min(1, { message: "이름을 입력해주세요" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다",
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
  {/* 이메일 입력 - 서버에서 중복체크를 수행합니다 */}
        <input
          {...register("email")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
            ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}

  {/* 비밀번호 입력 - 최소/최대 길이 검증은 zod 스키마에 의해 처리됩니다 */}
        <input
          {...register("password")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
            ${
              errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}

  {/* 비밀번호 확인 - 일치 여부는 refine로 체크됩니다 */}
        <input
          {...register("passwordCheck")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
            ${
              errors?.passwordCheck
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>
            {errors.passwordCheck.message}
          </div>
        )}

  {/* 이름 입력 - 사용자 프로필에 사용됩니다 */}
        <input
          {...register("name")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
            ${
              errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
          type="name"
          placeholder="이름"
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

  {/* 회원가입 버튼 - 제출 시 서버에 POST 요청을 보냅니다 */}
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium
            hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300`}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
