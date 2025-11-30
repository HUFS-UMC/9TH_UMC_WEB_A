import type { PaginaionDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginaionDto) :Promise<ResponseLpListDto> => {
    const{data} = await axiosInstance.get("v1/lps", {
        params: paginationDto,
    });

    return data;
};