import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Modal = () => {
  const { clearCart, closeModal } = useCartActions();
  const { isOpen } = useCartInfo();

  // 모달이 닫혀있다면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    // 오버레이: 전체 화면을 덮고 어두운 반투명 배경 (z-index 필수)
    <aside className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
      {/* 모달 컨텐츠 박스 */}
      <div className="bg-white w-80 p-8 rounded shadow-lg text-center">
        <h4 className="font-bold text-xl mb-4">정말 삭제하시겠습니까?</h4>
        <div className="flex justify-around mt-8">
          {/* 네 버튼: 장바구니 비우기 + 모달 닫기 */}
          <button
            type="button"
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-colors"
            onClick={() => {
              clearCart();
              closeModal();
            }}
          >
            네
          </button>
          {/* 아니요 버튼: 모달만 닫기 */}
          <button
            type="button"
            className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white px-4 py-2 rounded transition-colors"
            onClick={() => {
              closeModal();
            }}
          >
            아니요
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
