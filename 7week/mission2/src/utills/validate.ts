export type UserSigninformation = {
  email: string;
  password: string; // ✅ passward → password
};

function validateUser(values: UserSigninformation) {
  const errors = {
    email: "",
    password: "",
  };

  // 이메일 정규식 검사
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호 길이 검사
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요";
  }

  return errors;
}

export function validateSignin(values: UserSigninformation) {
  return validateUser(values);
}