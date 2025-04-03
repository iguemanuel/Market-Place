import axios from 'axios'

export async function getAddressByCep(zip: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zip}/json/`)

    if (response.data.erro) {
      throw new Error('CEP não encontrado')
    }

    return response.data
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error)
    throw error
  }
}
