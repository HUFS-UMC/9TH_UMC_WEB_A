import { useCartActions, useCartInfo } from "../hooks/useCartStore";


const PriceBox = () => {
    const { clearCart } = useCartActions();
    const {total} = useCartInfo();
    const handleInitializeCart = () => {
       clearCart();
    }
    return <div className="p-12 flex justify-between">
        <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer"
        >
            장바구니초기화
        </button>
        <div>총 가격: {total}원</div>
    </div>
};

export default PriceBox;