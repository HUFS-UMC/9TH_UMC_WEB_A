import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null; // ⭐ 모달이 열릴 때만 렌더링

  const handleConfirm = () => {
    dispatch(clearCart()); // 장바구니 전체 삭제
    dispatch(closeModal()); // 모달 닫기
  };

  const handleCancel = () => {
    dispatch(closeModal()); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      {/* 오버레이 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">정말 삭제할까요?</h2>

        <p className="text-sm text-gray-600 mb-6">
          장바구니에 담긴 모든 상품이 삭제됩니다.
        </p>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={handleCancel}
          >
            아니요
          </button>

          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
