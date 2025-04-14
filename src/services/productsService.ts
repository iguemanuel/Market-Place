import { api, endPoints } from './apiConfig'
import type { NewProduct, Product } from '@/interfaces/Product'
import { useAuthStore } from '@/store/authStore'

const getAuthHeaders = () => {
  const authStore = useAuthStore()
  return {
    user_id: `${authStore.user.id}`,
    Authorization: `Bearer ${authStore.token}`,
  }
}

export const createProduct = async (product: NewProduct, imageFile: File | null) => {
  try {
    const formData = new FormData()

    formData.append('name', product.name)
    formData.append('price', product.price.toString())
    formData.append('stock', product.stock.toString())
    formData.append('category_id', product.category_id.toString())
    formData.append('description', (product.description ?? '').toString())

    if (imageFile) {
      formData.append('image', imageFile)
    }

    const response = await api.post(endPoints.products, formData, {
      headers: {
        ...getAuthHeaders(),
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

export const updateProduct = async (id: number, product: Partial<NewProduct>) => {
  try {
    const response = await api.put(`${endPoints.products}/${id}`, product, {
      headers: {
        ...getAuthHeaders(),
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProductById = async (id: number) => {
  try {
    const response = await api.delete(`${endPoints.products}/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
