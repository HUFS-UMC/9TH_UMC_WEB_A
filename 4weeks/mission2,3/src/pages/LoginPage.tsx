import { validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage"; 
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken); 

  const { values, errors, touched, getInputProps } = useForm({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    console.log(values);

    let response: Awaited<ReturnType<typeof postSignin>> | undefined;

    try {
      response = await postSignin(values as any);
      setItem(response.data.accessToken);
    } catch (err: unknown) {
      const message =
        (typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as any).message === "string" &&
          (err as any).message) ||
        "로그인 중 알 수 없는 오류가 발생했습니다.";
      alert(message);
    }

    console.log(response); 
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => (error ?? "").toString().length > 0) ||
    Object.values(values).some((value) => (value ?? "") === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
    ${
      errors?.email && touched?.email
        ? "border-red-500 bg-red-200"
        : "border-gray-300"
    }`}
          type="email"
          placeholder="이메일"
        />

        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
    ${
      errors?.password && touched?.password
        ? "border-red-500 bg-red-200"
        : "border-gray-300"
    }`}
          type="password"
          placeholder="비밀번호"
        />

        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
