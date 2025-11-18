import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const deboucedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, deboucedValue, PAGINATION_ORDER.asc);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // if (isPending) {
  //   return <div className="mt-20">Loading...</div>;
  // }
  // if (isError) {
  //   return <div className="mt-20">Error</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-6 pt-10">
      {/* 1. 검색창 */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
        placeholder="검색어를 입력하세요"
      />

      {/* 2. 상태에 따른 조건부 렌더링 */}
      {isError ? (
        <div className="mt-20">Error occurred.</div>
      ) : (
        /* 데이터가 있거나 로딩 중일 때 그리드 표시 */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* 데이터 매핑 (데이터가 있을 때만) */}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}

          {/* 로딩 중이거나 추가 데이터 페칭 중일 때 스켈레톤 표시 */}
          {(isPending || isFetching) && <LpCardSkeletonList count={20} />}
        </div>
      )}

      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
