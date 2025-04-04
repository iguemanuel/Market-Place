import type { UserAddress } from '@/interfaces/User'
import { api, endPoints } from './apiConfig'
import { useAuthStore } from '@/store/authStore'

export const getProdutos = async () => {
  try {
    const authStore = useAuthStore()

    const response = await api.get(endPoints.products, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar produtos ' + error)
  }
}

export const getAddress = async () => {
  try {
    const authStore = useAuthStore()

    const response = await api.get(endPoints.address, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar endereços ' + error)
  }
}

export const createAddress = async (address: UserAddress) => {
  try {
    const authStore = useAuthStore()

    const response = await api.post(endPoints.address, address, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar endereço ' + error)
  }
}

export const updateAddress = async (address: UserAddress) => {
  try {
    const authStore = useAuthStore()

    const response = await api.put(`${endPoints.address}/${address.id}`, address, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar endereço ' + error)
  }
}

export const deleteAddress = async (addressId: number) => {
  try {
    const authStore = useAuthStore()

    const response = await api.delete(`${endPoints.address}/${addressId}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao deletar endereço ' + error)
  }
}
