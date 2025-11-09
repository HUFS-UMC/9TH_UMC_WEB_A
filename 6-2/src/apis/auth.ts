// src/api/auth.ts
import type {
  RequestSigninDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
  RequestSignupDto, // ✅ 중복 import 합침
} from "../types/auth";
import { axiosInstance } from "./axios";



export type SignupBody = {
  email: string;
  password: string;
  name: string;
};




export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const token = localStorage.getItem("accessToken"); // ✅ 토큰 분리
  const { data } = await axiosInstance.get("/v1/users/me", { // ✅ 경로: vl → v1, 슬래시 추가
    headers: token ? { Authorization: `Bearer ${token}` } : undefined, // ✅ 'Bearer ' 공백 포함
  });
  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout"); // ✅ 경로: vl → v1, 슬래시 추가
  return data;
};
