import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import CartItem from "./CartItem";
import { openModal } from "../slices/modalSlice";
import { useDispatch } from "react-redux"; 

const CartList = () => {
  const { cartItems } = useCartInfo();
  const { clearCart } = useCartActions();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal()); //모달
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 && (
        <div className="my-10">
          <p className="text-2xl font-semibold">장바구니가 비어있습니다</p>
        </div>
      )}
      <ul>
        {cartItems.map((item, index) => (
          <CartItem key={index} lp={item} />
        ))}
      </ul>
      <button onClick={handleOpenModal} className="p-4 border rounded-md my-10">
        전체 삭제
      </button>
    </div>
  );
};

export default CartList;
