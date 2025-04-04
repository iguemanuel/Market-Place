import axios from 'axios'
import type { User } from '@/interfaces/User'
import { api, endPoints } from '@/services/apiConfig'
import { useAuthStore } from '@/store/authStore'

export const getUser = async () => {
  try {
    const authStore = useAuthStore()

    const response = await api.get(endPoints.users, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })

    return response.data
  } catch (error) {
    console.error('Erro ao buscar usuário ' + error)
  }
}

export const uploadUserImage = async (file: File) => {
  try {
    const authStore = useAuthStore()
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.put(endPoints.userImg, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Erro ao enviar imagem:', error)
    throw error
  }
}

export const updateUser = async (user: User) => {
  try {
    const response = await api.put(endPoints.users, user)
    return response.data
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`${endPoints.users}/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
