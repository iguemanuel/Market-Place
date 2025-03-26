export interface Product {
  id: number
  name: string
  price: string
  image_path: string
  category: {
    name: string
    description: string
    id: number
  }
  image: string
  stock: number
  discounts?: []
}
