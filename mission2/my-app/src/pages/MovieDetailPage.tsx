import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      영화상세 페이지 입니다. <h1>오타니 안 파이팅</h1>{" "}
      <h1>{id}번 영화 상세페이지를 페칭해옵니다.</h1>
    </div>
  );
}
