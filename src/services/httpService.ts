import { api, endPoints } from './apiConfig'

export const produtos = async () => {
  try {
    const response = await api.get(endPoints.products)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar produtos ' + error)
  }
}
