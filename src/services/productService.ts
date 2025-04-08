import { api, endPoints } from './apiConfig'
import type { Product } from '@/interfaces/Product'

export const createProduct = async (product: Product) => {
  try {
    const response = await api.post(endPoints.products, product)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    const response = await api.get(endPoints.products)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
