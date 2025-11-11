import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    //<onsuccess>
    //data -> api 성공 응답데이터
    //variable -> mutate에 전달한 값
    //context -> onMutate에서 반환한 값
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
      console.log(context);
    },

    //<onerror>
    //error -> 요청 실패 시 발생한 에러
    //variable -> mutate에 전달한 값
    //context -> onMutate에서 반환한 값
    onError: (error, variable, context) => {},

    //<onmutate>
    //요청 직전에 실행되기 직전에 실행되는 함수
    //optimistic update를 구현할 때 유용
    onMutate: () => {
      return "hello";
    },

    //<onsettled>
    //요청이 끝난 후 항상 실행됨 (onSuccess, onError 후에 실행됨)
    //로딩 상태를 초기화할 때 유용
    onSettled: (data, error, variable) => {},
  });
}

export default usePostLike;
