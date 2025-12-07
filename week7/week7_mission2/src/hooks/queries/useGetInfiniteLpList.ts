import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
    limit: number,
    search: string,
    order: PAGINATION_ORDER
) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.lps, search, order], //search, order이 바뀌면 새로 데이터 불러옴
        queryFn: ({ pageParam = 0 }) =>
            getLpList({ cursor: pageParam, limit, search, order }), //API 요청 함수
        initialPageParam: 0,
        getNextPageParam: (lastPage: any) => {
            return lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined;
        },
    });
}

export default useGetInfiniteLpList;