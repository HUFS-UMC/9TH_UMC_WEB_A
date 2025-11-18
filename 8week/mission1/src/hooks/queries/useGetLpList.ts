import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../costants/key";

function useGetLpList({cursor, search, order, limit}:PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps],
        queryFn:() => 
            getLpList({
                cursor,
                search,
                order,
                limit
            }),
        staleTime: 1000*60*5,
        gcTime: 1000*60*10,
    })
}

export default useGetLpList;