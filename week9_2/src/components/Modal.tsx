import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded-md shadow-lg text-center">
        <h2 className="text-xl mb-4">정말 삭제하시겠습니까?</h2>

        <div className="flex justify-center gap-4">
          {/* 아니요 버튼 */}
          <button
            onClick={() => dispatch(closeModal())}
            className="border px-4 py-2 rounded"
          >
            아니요
          </button>

          {/* 네 버튼 */}
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="border px-4 py-2 rounded bg-red-500 text-white"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
