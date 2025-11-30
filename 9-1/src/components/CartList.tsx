import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Cart List</h2>

      <ul className="w-full flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} /> // CartLst ->CardItem으로 넘겨줌
        ))}
      </ul>
    </div>
  );
};

export default CartList;
