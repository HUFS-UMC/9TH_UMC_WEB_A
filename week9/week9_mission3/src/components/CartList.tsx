import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import type { RootState } from "../store/store";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const {cartItems} = useCartInfo();
  const {clearCart} = useCartActions();

  const handleAllClearButton = () => {
    clearCart();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 && (
        <div className="p-12">장바구니가 비어있습니다.</div>
      )}
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
      <button
        onClick={handleAllClearButton}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
    </div>
  );
};

export default CartList;
