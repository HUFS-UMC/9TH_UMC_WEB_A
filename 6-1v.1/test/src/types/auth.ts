import type { CommonResponse } from "./common";

//회원가입 관련 부분
export type RequestSignupDto = {  // requestuser -> requestsignupdto
  name: string;
  email: string;
  bio?: string;
  avatar?: string; // 없어도 되는 선택 속성
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
}>;

//로그인 관련 부분
export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = CommonResponse<{
    id:number;
    name:string;
    accessToken:string;
    refreshToken:string;
}>;

//내정보 조회
export type ResponseMyInfoDto = CommonResponse<{ id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createAt: Date;
  updateAt: Date}>;