import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("매튜");
  // useGetLpList에 검색어(search state)를 props로 전달해야 합니다.
  const { data, isPending, isError } = useGetLpList({ search });

  // console.log("data:", data);
  if (!isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  //   배열:useQuery(TanStack Query)는 기본적으로 data의 타입을 unknown으로 설정해.
// 즉, **“data가 어떤 형태로 올지 모른다”**고 가정하는 거라, data.map() 같은 배열 메서드를 바로 쓰면 TypeScript가 막는 거야.
  const list = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
    ? (data as any).data
    : [];

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      {/*  lp 타입 명시 해주기 */}
      {list.map((lp: { id: number; title: string }) => (
        <h1 key={lp.id}>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;

//로그인 경로인데도 홈페이지가 뜨는 이유 : children 들이 .
//element에는 공유하는 레이아웃들 적어주고
