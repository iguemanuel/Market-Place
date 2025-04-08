import { api, endPoints } from './apiConfig'
import type { Category, NewCategory } from '@/interfaces/Product'
import { useAuthStore } from '@/store/authStore'

export const createCategory = async (newCategory: NewCategory) => {
  try {
    console.log('Creating category:', newCategory)
    const authStore = useAuthStore()
    const response = await api.post(endPoints.categories, newCategory, {
      headers: {
        user_id: `${authStore.user.id}`,
        Authorization: `Bearer ${authStore.token}`,
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

export const getCategories = async () => {
  try {
    const response = await api.get(endPoints.categories)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export const deleteCategories = async (id: number) => {
  try {
    const response = await api.delete(`${endPoints.categories}/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
        user_id: `${useAuthStore().user.id}`,
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}

export const updateCategories = async (id: string, category: Category) => {
  try {
    const response = await api.put(`${endPoints.categories}/${id}`, category, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
        user_id: `${useAuthStore().user.id}`,
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}
