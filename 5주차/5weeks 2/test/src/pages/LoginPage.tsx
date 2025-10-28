import { validateSignin } from "../utils/validate";
import type { UserSigninInformation } from "../utils/validate";
import useForm from "../hooks/useForm"; // ✅ useForm 파일 위치에 맞게 경로 수정
import type { ResponseSigninDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // const [formValues, setFormValues] = useState({
  //     email:"",
  //     password:"",
  // });
  //주석을 아래와 같이 쓸수 있다.
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "," },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      await login(values);
      navigate("/my");
    } catch {
      const LoginPage = () => {
        // const [formValues, setFormValues] = useState({
        //     email:"",
        //     password:"",
        // });
        //주석을 아래와 같이 쓸수 있다.
        const { login } = useAuth();
        const navigate = useNavigate();
        const { values, errors, touched, getInputProps } =
          useForm<UserSigninInformation>({
            initialValue: { email: "", password: "," },
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
        // catch(error :any쓴 이유?):여기서 error를 any로 선언했기 때문에
        // TypeScript가 “message 속성이 있나 없나”를 검사하지 않음 → 에러 해결.

        //만약 네트워크 요청을 한다면...
        //지금 안하는 이유?-> 회원가입 해야함. : REACT HOOKFORM이라는 라이브러리 사용해야함.
        // const handleSubmit = async() => {
        //   console.log(values);
        //
        //   await axios.post('url',values)
        // };

        //erros가 비었을 때 로그인이라는 버튼을 활성화했으면 좋겠다.
        //->오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
        // {"email":"","password":""} 에서 object.values = value값을 말함 그니깐 ""가 비어있는지 보는것임

        const isDisabled =
          Object.values(errors || {}).some(
            (error: string) => error.length > 0
          ) || // 오류가 있으면 true
          Object.values(values).some((value: string) => value === ""); // 입력값이 비어있으면 True

        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
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

              {/*이메일의 유효성검증:골뱅이를 빼먹는다던지 그런거 를 할떄 에러를 보여주고 싶다. */}
              {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
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

      //   className="w-full bg-blue-600/ text-white /py-3/ rounded-md/ text-lg/ font-medium/ hover:bg-blue-700/ transition-colors"
      // 백그라운드 색깔
    }
  };


  // catch(error :any쓴 이유?):여기서 error를 any로 선언했기 때문에
  // TypeScript가 “message 속성이 있나 없나”를 검사하지 않음 → 에러 해결.

  //만약 네트워크 요청을 한다면...
  //지금 안하는 이유?-> 회원가입 해야함. : REACT HOOKFORM이라는 라이브러리 사용해야함.
  // const handleSubmit = async() => {
  //   console.log(values);
  //
  //   await axios.post('url',values)
  // };

  //erros가 비었을 때 로그인이라는 버튼을 활성화했으면 좋겠다.
  //->오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  // {"email":"","password":""} 에서 object.values = value값을 말함 그니깐 ""가 비어있는지 보는것임

  const isDisabled =
    Object.values(errors || {}).some((error: string) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value: string) => value === ""); // 입력값이 비어있으면 True

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
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

        {/*이메일의 유효성검증:골뱅이를 빼먹는다던지 그런거 를 할떄 에러를 보여주고 싶다. */}
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
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

//   className="w-full bg-blue-600/ text-white /py-3/ rounded-md/ text-lg/ font-medium/ hover:bg-blue-700/ transition-colors"
// 백그라운드 색깔
