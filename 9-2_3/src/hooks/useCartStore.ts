import type { CartItems } from "../types/cart";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems; // <-- 대문자 CartItems 아니고 cartItems 맞음
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,

    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) item.amount += 1;
        });
      },

      decrease: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item && item.amount > 0) item.amount -= 1;
        });
      },

      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },

      clearCart: () => {
        set((state) => {
          state.cartItems = [];
          state.amount = 0;
          state.total = 0;
        });
      },

      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price); // price가 문자열일 경우 대비
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

// -------------------- SELECTOR --------------------
export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartActions = (): CartActions =>
  useCartStore((state) => state.actions);
