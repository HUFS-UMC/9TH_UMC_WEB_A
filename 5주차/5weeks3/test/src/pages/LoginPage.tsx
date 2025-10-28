import { validateSignin } from "../utils/validate";
import type { UserSigninInformation } from "../utils/validate";
import useForm from "../hooks/useForm";
import type { ResponseSigninDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      await login(values);
      navigate("/my");
    } catch {
      navigate("/");
    }
  };

  // ✅ Google 로그인 핸들러 (사용 안 함: <a> 태그 href를 사용)
  // const handleGoogleLogin = () => {
  //   const base = import.meta.env.VITE_API_BASE_URL;
  //   const url = `${base}/v2/auth/google/login`;
  //   console.log("Redirecting to URL:", url);
  //   window.location.assign(url);
  // };

  const isDisabled =
    Object.values(errors || {}).some(
      (error) => typeof error === "string" && error.length > 0
    ) || // 오류가 있으면 true
    Object.values(values || {}).some(
      (value) => typeof value === "string" && value === ""
    ); // 입력값이 비어있으면 True

  console.log("VITE_SERVER_API_URL =", import.meta.env.VITE_SERVER_API_URL); // 이 변수는 .env에 없다면 undefined가 됩니다.

  // -----------------------------------------------------
  // ✅ 수정된 Google 로그인 URL: VITE_API_BASE_URL 사용
  const googleLoginUrl = `${import.meta.env.VITE_API_BASE_URL}/v1/auth/google/login`;
  // -----------------------------------------------------

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        {/* 이메일 입력 필드 */}
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type={"email"}
          placeholder={"이메일"}
        />

        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        {/* 비밀번호 입력 필드 */}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        {/* 일반 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* ✅ Google 로그인 버튼: <a> 태그의 href만 사용하여 라우터 간섭 방지 */}
        <a
          href={googleLoginUrl}
          // <a> 태그에 w-full 클래스를 적용하여 버튼 너비를 맞춥니다.
          className="w-full"
        >
          <button
            type="button"
            // ❌ onClick={handleGoogleLogin} 제거! <a> 태그와 충돌 방지
            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              {/* 이미지 주석 처리 유지 */}
              <span>구글 로그인</span>
            </div>
          </button>
        </a>
        {/* ---------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default LoginPage;