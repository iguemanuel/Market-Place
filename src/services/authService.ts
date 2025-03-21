import { api, endPoints } from './apiConfig'
import type { User } from '../interfaces/Auth'

export const login = async (user: User) => {
  try {
    const response = await api.post(endPoints.login, user)

    const { token, user: userData } = response.data

    return { token, userData }
  } catch (error) {
    console.error('Erro ao fazer login ' + error)
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
