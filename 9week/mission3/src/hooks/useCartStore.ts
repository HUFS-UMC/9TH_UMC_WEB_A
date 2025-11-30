import { create } from "zustand";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartitems";
import { useShallow } from "zustand/shallow";
import { immer } from "zustand/middleware/immer";


interface CartActions {
    increase: (id:string) => void;
    decrease: (id:string) => void;
    removeItem: (id:string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions
}
//zustand로 전역 상태를 만들고 그 상태 구조는 위에서 정의한 CartState로 하겠다는 의미
//여기서 immer가 중요한데 이는 미들웨어 중 한가지로 불변성을 신경쓰지않고 상태를 변경하는 것을 가능하게 해줌
//set은 상태를 변경하는 유일한 함수임 초반에 set을 통해서 초기값을 지정함
//draft란 immer가 만들어 주는 가짜 상태 그래서 왜 필요하냐 -> 가짜 상태를 마음대로 바꿀 수 있음
export const useCartStore = create<CartState>()(
    immer((set => ({
    // 상태의 초기값을 정의함
    cartItems: cartItems,
    amount: 0,
    total: 0,
    //actions의 객체들을 정의해줌 이것 들이 상태를 변경하는 로직을 담당함
    actions: {
        increase: (id:string) => {
            // immer사용 안할 시 불변성을 유지하기 위해서 redux에서는 map으로 배열을 복사하고 변경사항 외의 것들을
            //스프레드 연산자를 통해서 넘겨줌
            //set((state) => ({
            //   cartItems: state.cartItems.map((item) => 
            //    item.id === id ? {...item, amount: item.amount + 1} : item
            //),
            //}))
            //suztand에서는 불필요한 과정 필요 없음
            set((state) => {
                const cartItem = state.cartItems.find((item) => item.id ===
            id);
            if (cartItem) {
                cartItem.amount += 1
            }
            })
        },
        decrease: (id:string) => {
            set((state) => {
                const cartItem = state.cartItems.find((item) => item.id ===
            id);
            if (cartItem && cartItem.amount > 0) {
                cartItem.amount -= 1
            }
            })
        },
        removeItem: (id:string) => {
            set((state) => {
            state.cartItems = state.cartItems.filter((item) => item.id !==
            id);
            })},
        clearCart: () => {
            set((state) => {
                state.cartItems = [];
            });
        },
        calculateTotals: () => {
            set((state) => {
                let total = 0;
                let amount = 0;

                state.cartItems.forEach((item) => {
                    amount += item.amount;
                    total += item.price * item.amount;
                });
                state.amount = amount;
                state.total = total
            })
        },
    },
}))
));
//zustand는 뽑아온 값이 하나라도 다르면 컴포넌트 리렌더링을 수행함 근데 이게 문제임 왜 why
//객체의 값은 다 같은데 그냥 새로 생기면 값들이 같아도 서로 다르다고 판단해서 리렌더링이 발생함
//useShallow를 이용하면 값이 같은 경우는 서로 같다고 판단해서 리렌더링을 방지해줌
//마지막으로 상태와 기능의 분리의 이유는 상태는 변경이 잦기에 해당 요소에 대해 변경시 리렌더링이 필수임
//이때 기능까지 불필요한 리렌더링 발생함 기능은 한번 정의하면 불변이기에 렌더링 필요 없어서 분리함
export const useCartInfo = () => useCartStore(
    useShallow((state) => ({
        cartItems: state.cartItems,
        amount: state.amount,
        total: state.total,
    }
    )
)
)

export const useCartActions = () => useCartStore((state) => state.actions);