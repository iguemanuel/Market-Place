import { api, endPoints } from './apiConfig'
import type { Category } from '@/interfaces/Product'

export const createCategory = async (category: Category) => {
  try {
    const response = await api.post(endPoints.categories, category)
    return response.data
  } catch (error) {
    console.error('Error creating :', error)
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
