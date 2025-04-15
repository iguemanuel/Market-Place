import { defineStore } from 'pinia'
import type { Product } from '@/interfaces/Product'
import type { CartItem } from '@/interfaces/Cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
    totalPrice: 0,
  }),

  getters: {
    cartTotalItems(state): number {
      return state.cartItems.reduce((total: number, item: any) => total + item.quantity, 0)
    },
    cartTotalPrice(state): number {
      return state.cartItems.reduce(
        (total: number, item: any) => total + item.product.price * item.quantity,
        0,
      )
    },
  },

  actions: {
    addToCart(product: Product) {
      const existingItem = this.cartItems.find((item: CartItem) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ product, quantity: 1 })
      }
    },
    removeFromCart(productId: number) {
      this.cartItems = this.cartItems.filter((item: CartItem) => item.product.id !== productId)
    },
    clearCart() {
      this.cartItems = []
    },
    updateQuantity(product: Product, quantity: number) {
      const existingItem = this.cartItems.find((item: CartItem) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity = quantity
      }
    },
  },
})
