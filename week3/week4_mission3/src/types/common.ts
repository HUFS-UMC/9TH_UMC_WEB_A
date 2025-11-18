// console 값 중 공통 값들을 정리해주는 파일
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};