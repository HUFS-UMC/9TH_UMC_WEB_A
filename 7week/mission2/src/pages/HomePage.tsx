import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer";
import type { Lp, ResponseLplistDto } from "../types/lp";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard";
const HomePage = () => {
    const [search, setSearch] = useState("");
    // const {data, isPending, isError} = useGetLpList({
    //     search,
    //     limit: 50,
    // })

    const { data:lps, isFetching, hasNextPage, isPending, isError, fetchNextPage } =
    useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

    const{ref, inView} = useInView({
        threshold: 0,
});
    useEffect(() => {
  if (inView && hasNextPage && !isFetching) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isFetching, fetchNextPage]);

    if(isPending) {
        return <div className={"mt-20"}>Loading...</div>
    }
    if(isError) {
        return <div className={"mt-20"}>Error...</div>
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <input value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
            {isPending && <LpCardSkeletonList count={20}/>}
            {lps?.pages
            ?.map((page: ResponseLplistDto) => page.data.data)
            ?.flat()
            ?.map((lp: Lp) => <LpCard key={lp.id} lp={lp} />)}
            {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        <div ref={ref} className="h-2"></div>
        </div>
    );
};

export default HomePage;


