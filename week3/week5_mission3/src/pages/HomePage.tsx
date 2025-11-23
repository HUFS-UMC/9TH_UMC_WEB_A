import useGetLpList from "../hooks/queires/useGetLpList";

const HomePage = () => {
    const {data, isPending, isError} = useGetLpList({});

    if(isPending) {
        return <div className={"mt-20"}>Loading...</div>
    }

    if(isError){
        return <div className={"mt-20"}>Error.</div>
    }

    return (
        <div>{data?.map((lp) => <h1>{lp.title}</h1>)}</div>
        //select 덕분에 data?.data.data 할 필요 없음
    )
}

export default HomePage;