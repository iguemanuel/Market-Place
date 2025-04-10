import { api, endPoints } from './apiConfig'
import type { NewProduct, Product } from '@/interfaces/Product'
import { useAuthStore } from '@/store/authStore'

export const createProduct = async (product: NewProduct) => {
  try {
    const authStore = useAuthStore()
    const response = await api.post(endPoints.products, product, {
      headers: {
        user_id: `${authStore.user.id}`,
        Authorization: `Bearer ${authStore.token}`,
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
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
