import { api, endPoints } from './apiConfig'
import type { User } from '../interfaces/Auth'

export const login = async (user: User) => {
  try {
    const response = await api.post(endPoints.login, user)
    return response.data
  } catch (error) {
    console.error('Erro ao fazer user ' + error)
  }
}
