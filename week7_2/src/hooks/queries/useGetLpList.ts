import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    staleTime: 1000 * 60 * 5,
    gcTime: 100 * 60 * 10,
    //enabled: Boolean(search),

    refetchInterval: 100 * 60,

    select: (data) => data.data,
  });
}
