import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../costants/key";


function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data) => {
  console.log("invalidate 호출됨 ✅", data);
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEY.lps, data.data.lpId],
    exact: true,
  });
},

  });
}

export default useDeleteLike;
