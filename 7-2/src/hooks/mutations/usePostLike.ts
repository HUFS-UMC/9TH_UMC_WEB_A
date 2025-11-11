import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    // onMutate : API 요청 이전에 호출되는 친구
    // UI에 바로 변경을 보여주기 위해 Cache 업데이트
    onMutate: async (lp: RequestLpDto) => {
      // 1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들 것
      // 복사하는 가장 큰 이유는 나중에 오류 발생 시 이전 상태로 되돌리기 위함
      const newLpPost = previousLpPost ? { ...previousLpPost } : undefined;

      // 게시글에 저장된 좋아요 목록애서 현재 내가 눌렀던 좋아요의 위치를 찾아야 함
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like: Likes) => like.userId === userId
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      // 업데이트된 게시글 데이터를 캐시에 저장
      // 이러게 하면 내가 바로 업데이트 되고 사용자가 변화 확인 가능
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);
      return { previousLpPost, newLpPost };
    },

    onError: (err: Error, newLp: RequestLpDto, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context.previousLpPost
      );
    },

    // onSettled는 API 요청이 끝난 후 (성공하든 실패하든 실행)
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
    // // data : API 성공 응답 데이터
    // // variables : mutate에 전달한 값
    // // context : onMutate에서 반환 값
    // onSuccess: (data, variables, context) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.lps, data.data.lpId],
    //     exact: true,
    //   });
    // },
    // // error : 요청 시 실패한 데이터
    // // variables : mutate에 전달한 값
    // // context : onMutate에서 반환 값
    // onError: (error, variables, context) => {},
    // // 요청 직전 실행되기 전에 실행되는 함수
    // // Optimistic Update를 구현할 때 유용
    // onMutate: (variables: RequestLpDto) => {},
    // // 요청 끝난 후 항상 실행됨(onSuccess, onError 후에 실행)
    // // 로딩 상태를 초기화 할때 조금 유용
    // onSettled: (data, error, variables, context) => {},
  });
}

export default usePostLike;
