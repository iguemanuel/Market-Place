import { api, endPoints } from './apiConfig'
import type { User } from '../interfaces/User'
import { useAuthStore } from '@/store/authStore'

export const login = async (user: User) => {
  try {
    const response = await api.post(endPoints.login, user)
    const { token, user: userData } = response.data

    return { token, userData }
  } catch (error) {
    throw new Error('Erro ao fazer login ' + error)
  }
}

export const register = async (user: User) => {
  try {
    const response = await api.post(endPoints.register, user)
    console.log(response.data)

    return response.data
  } catch (error) {
    console.error('Erro ao fazer cadastro ' + error)
  }
}

export const getUser = async () => {
  try {
    const authStore = useAuthStore() // Pegando o token do Pinia

    const response = await api.get(endPoints.users, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })

    return response.data
  } catch (error) {
    console.error('Erro ao buscar usuário ' + error)
  }
}
