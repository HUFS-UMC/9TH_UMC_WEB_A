//검증관련 로직
export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "", // 에러가 발생하면 이 빈값들에 에러 메세지를 넣어준다.
  };








  // 이메일 유효성 검사를 통과하지 않으면 유효하지 않은 이메일이다 가 뜨고 싶다.
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  //비밀 번호 8자-20자 사이
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8-20자사이로 입력해주세요";
  }

  return errors;
}

//로그인 유효성 검사
function validateSignin(values:UserSigninInformation){
    return validateUser(values);
}

export {validateSignin};