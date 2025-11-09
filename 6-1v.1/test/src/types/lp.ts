import type { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userld: number;
  lpld: number;
};

export type ResponseLpListDto = CursorBasedResponse<{
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
  }[];
}>;

//지금 Lp목록 조회 명세서보면 data안에 data가 또 들었는데 쿼리 안의 어떠 기능을 쓸수 있는지 알려주려고 일부러 한거임
