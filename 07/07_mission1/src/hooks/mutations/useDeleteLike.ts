import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
  return useMutation({
    // 실제 수행할 함수
    mutationFn: deleteLike,
    // 요청이 성공했을 때 실행되는 콜백 함수
    onSuccess: (data) => {
      // 최신 상태 갱신
      // 특정 쿼리를 무효화해서 다시 refetch 하도록
      queryClient.invalidateQueries({
        // lpId가 일치하는 데이터를 다시 불러옴
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
  });
}

export default useDeleteLike;
