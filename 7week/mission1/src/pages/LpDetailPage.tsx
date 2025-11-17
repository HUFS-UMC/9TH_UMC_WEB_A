import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const lpIdNum = Number(lpId);
  const { accessToken } = useAuth();

  const { data: lp, isPending, isError } = useGetLpDetail({ lpId: lpIdNum });
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);


  const handleLikeLp = () => {
    if (!isLiked) likeMutate({ lpId: lpIdNum });
  };

  const handleDislikeLp = () => {
    if (isLiked) disLikeMutate({ lpId: lpIdNum });
  };

  if (isPending || isError) return null;

  return (
    <div className="mt-12">
      <h1>{lp?.data.title}</h1>
      <img src="https://i.namu.wiki/i/yOlWMmQqNyH85vgnZkyKHjEb0tLiWZB6PsXx4JGQRztJ3xKvAnrY_8Uan1MVbjx4gOzOomy3aRauptZcfpAKGg.webp" 
      alt={lp?.data.title}
      className="w-[12.5%] h-auto" />
      <p>{lp?.data.content}</p>

      <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
        <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"} />
      </button>
    </div>
  );
};

export default LpDetailPage;
