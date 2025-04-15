import type { Product } from '@/interfaces/Product'

export interface CartItem {
  product: Product
  quantity: number
}
