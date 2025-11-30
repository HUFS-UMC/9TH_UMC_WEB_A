import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

//1. 저장소 생성(//store는 중앙저장소(redux 툴킷을 위해 필요)
function createStore() {
  const store = configureStore({
    //2.리듀서 설정
    reducer: {
      cart: cartReducer,
    },
  });

  return store;
}

//store 를 활용할 수 있도록 내보내야 함.
//여기서 실행해서 스토어를 빼준다.
//이런것을 "싱글톤 패턴"이라함
const store = createStore(); //실행해서

export default store; //스토어를 뺴준다.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
