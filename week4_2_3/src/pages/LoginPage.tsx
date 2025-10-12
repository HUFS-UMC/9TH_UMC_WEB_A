import { validateSignin, type UserSigninInformation } from "../utils/validate";
import useForm from "../hooks/useForm";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 버튼 비활성화 조건
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
  {/* 이메일 입력 - 폼 유효성은 useForm 훅에서 처리합니다 */}
        <input
          {...getInputProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
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

  {/* 비밀번호 입력 - 보안상 입력값은 클라이언트에서만 검증합니다 */}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
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

  {/* 로그인 버튼 - 서버 응답에 따라 토큰을 로컬스토리지에 저장합니다 */}
  <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full py-3 rounded-md text-lg font-medium text-white
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transition-colors"
            }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
