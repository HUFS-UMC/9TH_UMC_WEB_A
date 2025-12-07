import { useQuery } from "@tanstack/react-query";
import type { PaginaionDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}:PaginaionDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps],
        queryFn:() => getLpList({
            cursor,
            search,
            order,
            limit,
        }),
        //5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
        staleTime: 1000*60*5, //5분
        //사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간
        //staleTime이 지나고 데이터가 지나지 않더라도 일정 시간동안 메모리에 보관
        // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거한다.
        //10분 동안 사용되지 않으면 캐시 데이터가 삭제되며 다시 요청 시 새 데이터를 받아오게 된다.
        gcTime: 100*60*10, //10분

        //조건에 따라 쿼리를 실행 여부 제어
        //enabled: Boolean(search),

        //refetchInterval:100*60, //10초
        //10초마다 자주 fetching할 수 있음

        //retry: 3,
        //retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정한다
        //기본값은 3회 정도, 네트워크 오류 등 임시적인 문제를 해결할 수 있다


        //initialData :  쿼리 실행 전 미리 제공할 초기 데이터를 설정한다
        //컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있다

        //keepPreviousData: true,
        //파라미터가 변결될 때 이전 데이터를 유지하여 UI 깜빡임(Flicking)을 줄여준다

        select:(data) => data.data.data,
    });
}

export default useGetLpList;