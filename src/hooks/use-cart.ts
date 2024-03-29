import { products } from "@/db/schema";
import { create } from "zustand";
import {
    createJSONStorage,
    persist,
  } from 'zustand/middleware'
  

export type CartItem = {
    product: {
        id: string,
        title: string,
        image: string,
        color: string,
        size: string,
        price: string,
        priceId: string
    } 
}

type CartState = {
    items: CartItem[],
    addItem: (product: {
        id: string,
        title: string,
        image: string,
        color: string,
        size: string,
        price: string,
        priceId: string
    } ) => void,
    removeItem: (productId: string) => void,
    clearCart: () => void
}

export const useCart = create<CartState>()(
    persist(
      (set) => ({
        items: [],
        addItem: (product) =>
          set((state) => {
            return { items: [...state.items, { product }] }
          }),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.product.id !== id
            ),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )