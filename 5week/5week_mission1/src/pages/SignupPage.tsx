import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ResponseSignupDto } from "../types/auth";
import { postSignup } from "../apis/auth";

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
  passwordCheck: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),  
  name: z.string().min(1, { message: "이름을 입력해주세요." })
  
  }).refine((data)=> data.password === data.passwordCheck, {
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
    mode: "onBlur"
  });

  const onSubmit = async(data: FormFields) => {
    const {passwordCheck, ...rest} = data;

    const response : ResponseSignupDto = await postSignup(rest);

    console.log(response);

  };

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[300px] mx-auto mt-10"
    >
      <input
        type="text"
        placeholder="이름"
        {...register("name")}
        className="border p-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        type="email"
        placeholder="이메일"
        {...register("email")}
        className="border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="비밀번호"
        {...register("password")}
        className="border p-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <input
        type="password"
        placeholder="비밀번호 확인"
        {...register("passwordCheck")}
        className="border p-2 rounded"
      />
      {errors.passwordCheck && (
        <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>
      )}


      

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupPage;
