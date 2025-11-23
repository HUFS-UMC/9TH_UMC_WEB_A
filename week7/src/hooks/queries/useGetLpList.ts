import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    // 데이터가 신선하다고 간주되는 시간.
    // 이 시간 동안은 캐시된 데이터를 그대로 사용. 컴포넌트가 마운트 되어도 재요청 X, 창에 포커스 들어오는 경우도 재요청 X
    staleTime: 1000 * 60 * 5, // 5 minutes
    // 사용되지 않는 쿼리 데이터가 캐시에 남아있는 시간.
    // stale Time이 지나고 데이터가 신선하지 않더라도, 일정시간 메모리에 보관
    // 그 이후 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거
    // 예: 10분동안 사용되지 않으면 캐시 데이터 삭제, 다시 요청ㄹ시 새 데이터 받아오게 됨.
    gcTime: 1000 * 60 * 10, // 10 minutes

    // enabled: Boolean(search), // 쿼리 자동 실행 여부
    // refetchInterval: 100 * 60 //10초마다 백그라운드에서 자동 재요청
    // retry: 3 // 쿼리 실패시 재시도 횟수, 네트워크 오류 등 임시적 문제 보완 가능

    // initialDate: // 쿼리의 초기 데이터 설정 (캐시된 데이터가 없을 때만 사용)
    // 컴포넌트가 렌더링될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI 구성
    // keepPreviousData: true // 쿼리 키가 변경될 때 이전 데이터를 유지할지 여부

    select: (data) => data.data.data,
  });
}

export default useGetLpList;
