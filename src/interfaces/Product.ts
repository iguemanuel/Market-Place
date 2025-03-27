export interface Product {
  id: number
  name: string
  price: string
  image_path: string
  category: Category
  image: string
  stock: number
  discounts?: []
}

export interface Category {
  name: string
  description: string
  id: number
}
