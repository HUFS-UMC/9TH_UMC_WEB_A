import { validateSignin } from "../utils/validate";
import type { UserSigninInformation } from "../utils/validate";
import useForm from "../hooks/useForm";
import type { ResponseSigninDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import google from "../assets/google.png";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth(); // auth 안에는 { accessToken, login, logout }이 들어 있는데 그 중 login가져오기
  const navigate = useNavigate();//React Router의 페이지 이동 함수 및에 navigate (my) 로사용

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({ // 제네릭 타입으로 이 폼이 다룰 데이터의 형태를 고정함여기서는 { email: string; password: string }
      initialValue: { email: "", password: "" },//폼의 초기 상태. 두 칸 모두 빈 문자열로 시작.
      validate: validateSignin,//유효성 검사:useForm 훅에게 입력값이 올바른지 검증하는 역할 ex)
    });

  const handleSubmit = async () => {
    try {
      await login(values);//useAuth() 훅에서 가져온 login 함수 실행.
      navigate("/my");//로그인 성공->my페이지
    } catch {
      navigate("/");//못하면 홈
    }
  };

  // Google 로그인 핸들러 (onClick):*** handleGoogleLogin: “구글 로그인” 클릭 시 백엔드로 리다이렉트되는곳
  const handleGoogleLogin = () => {
    window.location.href =// react : spa방식 (ui만 새로그림) vs window.location.href :착각하지 말것 탭을 여는 게 아니라,지금 보고 있던 탭이 그대로 http://localhost:8000 /v1/auth/google/login로 가는것
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"; //.env 파일에 설정된 백엔드 서버 주소를 읽어옴 
  };

// 버튼을 누르면 브라우저가 http://localhost:8000/v1/auth/google/login으로 이동해서
// 백엔드가 Google 로그인 페이지로 자동 리다이렉트시켜 줘.
// 그 후 Google 인증이 끝나면, 백엔드가 다시 프론트엔드 콜백 페이지로 되돌려 보내는 구조


  const isDisabled =
    Object.values(errors || {}).some(
      (error) => typeof error === "string" && error.length > 0 //errors 객체 안에 에러 메시지가 하나라도 있으면 → true
    ) ||
    Object.values(values || {}).some(
      (value) => typeof value === "string" && value === ""//입력값 중에 아직 비어 있는 칸이 하나라도 있으면 true
    );

    //Object.values() : 객체(Object)**의 모든 “값(value)”을 배열로 바꿔주는 메서드야

    //errors || {}는 "errors가 없으면(예: undefined면) 빈 객체로 대체해줘"
    //배열(Array)**의 내장 메서드.: 배열 안의 원소 중 하나라도 조건을 만족하면 true”를 반환. //[1, 2, 3].some(n => n > 2); // true (3이 조건 만족)

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
          type="email"
          placeholder="이메일"
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
          type="password"
          placeholder="비밀번호"
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

        {/* ✅ Google 로그인 버튼: onClick 핸들러로 변경 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2">
            <img
              src={google}
              style={{ width: "20px", height: "20px" }}
              alt="구글 아이콘"
            />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
