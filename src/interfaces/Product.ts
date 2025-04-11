export interface Discount {
  percentage?: number
}

export interface Category {
  id: number
  name: string
  description: string
  image_path: string
}

export type NewCategory = Omit<Category, 'id'>

export interface Product {
  id: number
  name: string
  price: string
  image_path: string
  description: string
  stock: number
  category: Category
  discounts?: Discount[]
}

export interface NewProduct {
  name: string
  description?: string | null
  price: number
  stock: number
  category: Category | null
  image?: string
}
