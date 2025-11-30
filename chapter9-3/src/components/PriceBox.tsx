import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useCartActions();

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={() => openModal()} // 클릭 시 모달 열기로 바꾸기
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
