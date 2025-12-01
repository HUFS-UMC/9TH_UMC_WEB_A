import { useAppSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";

export default function CartList() {
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
}
