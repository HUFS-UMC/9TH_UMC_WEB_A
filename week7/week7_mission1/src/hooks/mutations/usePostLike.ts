import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    // data -> API 성공 응답데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    mutationFn: postLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },

    // onError
    // error -> 요청 실패 시 발생한 에러

    // onMutate
    // 요청이 실행되기 직전에 실행되는 함수
    // optimistic update를 구현할 때 유용

    // onSettled
    // 요청이 끝난 후 항상 실행됨 (OnSuccess, onError 후에 실행됨)
    // 로딩 상태를 초기화할 때 조금 유용
  });
}

export default usePostLike;