import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

const ENDPOINT = "/v1/ps";

export const getLpList = async (PaginationDto:PaginationDto,):Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/ps", { params: PaginationDto });

  return data;
};
