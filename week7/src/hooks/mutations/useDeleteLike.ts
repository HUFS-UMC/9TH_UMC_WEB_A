import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    //onMutate: API 요청 이전에 호출되는 것.
    // ui에 바로 변경을 보여주기 위해 cache 업데이트
    onMutate: async (lp) => {
      // 1. 게시글에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });
      // 2. 현재 게시글의 데이터를 캐시에서 가져와야
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);
      // 3. 게시글 데이터를 복사해서 new lp post라는 새로운 객체를 만들 것. 오류 발생 시 이전 상태로 돌리기 위함
      const newLpPost = { ...previousLpPost };

      // 게시글에 저장된 좋아요의 위치를 찾아야 함
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);
      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }
      // 업데이트된 게시글 데이터를 캐시에 저장. 이렇게 하면 UI가 바로 업데이트 됨
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);
      return { previousLpPost, newLpPost };
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },
    //onsettled는 api 요청 끝난 후
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
