import { useQuery } from "@tanstack/react-query";
import type { RequestLpDto, ResponseLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../costants/key";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail({ lpId }: RequestLpDto) {
  return useQuery<ResponseLpDto>({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
  });
}

export default useGetLpDetail;
