import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={() => dispatch(openModal())}  // ★ 모달 열기
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
