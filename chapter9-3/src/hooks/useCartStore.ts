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
  calculateTotals: () => number;
  openModal: () => void;
  closeModal: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isOpen: boolean;

  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    isOpen: false,

    actions: {
      increase: (id: string) => {
        //set((state) => ({
        //   cartItems: state.cartItems.map((item) =>
        //    item.id === id ? {...item, amount: item.amount + 1} : item
        //),
        //}))
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
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
          state.total = total;
        });
      },
      openModal: () => {
        set((state) => {
          state.isOpen = true;
        });
      },
      closeModal: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
    },
  }))
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
      isOpen: state.isOpen,
    }))
  );

export const useCartActions = () => useCartStore((state) => state.actions);
