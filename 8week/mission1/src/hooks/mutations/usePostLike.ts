import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../costants/key";
import { queryClient } from "../../App";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";


function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // onMutate는 api 요청 이전에 호출되는 친구, ui바로 업데이트를 위해서 캐시를 업데이트
        onMutate: async(lp) => {
          await queryClient.cancelQueries({
            queryKey: [QUERY_KEY.lps, lp.lpId],
          });
    
          //현재 게시글의 데이터를 캐시에서 가져옴
          const previousLpPost = queryClient.getQueryData<ResponseLpDto> ([QUERY_KEY.lps, lp.lpId]);
        
          // 게시글 데이터를 복사해서 객체를 만듦 이유는 나중에 오류가 발생하면 이전 상태로 돌아가기 위해서
          const newLpPost = {...previousLpPost};
    
          //게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야함 -> 좋아요의 유아 id와 내 id 비교
          const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
          
          const userId =Number(me?.data.id);
    
          const likedIndex = 
          previousLpPost?.data.likes.findIndex(
            (like) => like.userId === userId,
          ) ?? -1
    
          if(likedIndex >= 0) {
            previousLpPost?.data.likes.splice(likedIndex, 1) // likes에서 내가 누른 좋아요를 삭제함
          } else {
            const newLike = {userId, lpId:lp.lpId} as Likes;
            previousLpPost?.data.likes.push(newLike);
          }
            // 업데이트된 게시글 데이터를 캐시에 저장
            // 이렇게하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있다.
          queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);
    
          return {previousLpPost, newLpPost}
        },
    
        //에어 발생시 서버 롤백
          
        onError: (err, newLp, context) => {
          console.log(err,newLp);
          queryClient.setQueryData(
            [QUERY_KEY.lps, newLp.lpId],
            context?.previousLpPost?.data.id,
          );
        },
    
        //onSettled는 api요청이 끝난 후 성공이든 실패든 실행
        onSettled: async (data, error, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey:[QUERY_KEY.lps, variables.lpId],
          });
        }
      });
  
  
}

export default usePostLike;
