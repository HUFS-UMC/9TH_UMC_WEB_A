import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth"; // 경로 맞게 조정


// 스키마 정의로그인보다 에러메세지를 받아 오는게 훨씬 간단함.
export const schema = z
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
    //비밀번호가 일치 하지 않을떄
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"], // passwordCheck 필드에 오류 표시
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // iSubmitting :데이터 요청을 하고 있을 떄 버튼에 로딩 처리 할떄 쓰는것
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },

    //스키마에 위반하면 에러메세지를 띄워주고 싶다.
    //괄호안 스키마는 위에서 선언한 스키마이다.
    resolver: zodResolver(schema),
    // blur고치기?
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    //서버에 보내줄때 -> password check는 안 보내주고 싶으면 역구조 분해 할당으로 해주자.
    const { passwordCheck: _omit, ...rest } = data;
    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-ful gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type={"email"}
          placeholder={"이메일"}
        />

        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"비밀번호"}
        />

        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}

        <input
          {...register("passwordCheck")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"비밀번호 확인"}
        />

        {errors.passwordCheck?.message && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="text"
          placeholder={"이름"}
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;

//로그인은 utils/validate.ts를 썼다면 회원가입은 타입스크립트계열에서 유효성 검사할떄 많으쓰는 조드(?)를 쓸거다.
