import { CommonResponse } from "./common";

//회원가입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

// 회원가입 (응답)
export type ResponseSignupDto = CommonResponse<{  // 영상오타: RequestSignupDto → ResponseSignupDto
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updateAt: Date;
}>;

//로그인
export type RequestSigninDto = {
  email: string;
  password: string;
};

//로그아웃
export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

//내정보조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updateAt: Date;
}>;
