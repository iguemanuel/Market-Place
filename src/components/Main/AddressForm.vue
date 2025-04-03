<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { MoreVertical, Plus, X, Check, Edit, Trash } from 'lucide-vue-next'
import type { UserAddress } from '@/interfaces/User'
import { getAddressByCep } from '@/services/cepService'
import { getAddress, createAddress, updateAddress } from '@/services/httpService'

const addresses = ref<UserAddress[]>([])
const isModalOpen = ref(false)
const openMenuId = ref<number | null>(null) // Controla o menu aberto

const newAddress = ref<UserAddress>({
  country: '',
  id: 0,
  user_id: 0,
  zip: '',
  state: '',
  street: '',
  number: 0,
  city: '',
})

watch(
  () => newAddress.value.zip,
  async (newZip) => {
    if (newZip.length === 8 && /^[0-9]+$/.test(newZip)) {
      try {
        const response = await getAddressByCep(newZip)
        newAddress.value.street = response.logradouro
        newAddress.value.state = response.uf
        newAddress.value.city = response.localidade
      } catch (error) {
        console.error('Erro ao buscar endereço:', error)
      }
    }
  },
)

const fetchAddresses = async () => {
  try {
    addresses.value = await getAddress()
    console.log('Endereços buscados:', addresses.value)
  } catch (error) {
    console.error('Erro ao buscar endereços:', error)
  }
}

const saveAddress = async () => {
  try {
    let savedAddress: UserAddress

    if (!newAddress.value.id) {
      savedAddress = await createAddress(newAddress.value)
      addresses.value.push(savedAddress)
      console.log('Endereço criado:', savedAddress)
    } else {
      savedAddress = await updateAddress(newAddress.value)
      const index = addresses.value.findIndex((addr) => addr.id === savedAddress.id)

      if (index !== -1) {
        addresses.value[index] = savedAddress
      }
      console.log('Endereço atualizado:', savedAddress)
    }

    closeModal()
  } catch (error) {
    console.error('Erro ao salvar endereço:', error)
  }
}

const openModal = (address?: UserAddress) => {
  isModalOpen.value = true
  newAddress.value = address
    ? { ...address }
    : { country: '', id: 0, user_id: 0, zip: '', state: '', street: '', number: 0, city: '' }
}

const closeModal = () => {
  isModalOpen.value = false
}

const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

const closeMenu = () => {
  openMenuId.value = null
}

onMounted(fetchAddresses)
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-2xl font-bold">Endereços</h1>

    <div v-if="addresses.length" class="space-y-4">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="relative rounded-lg border bg-white shadow-sm p-4 !mt-5"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">{{ address.street }} {{ address.number }}</h3>
            <p class="text-sm text-gray-500">
              CEP {{ address.zip }} - {{ address.state }} - {{ address.city }}
            </p>
          </div>

          <!-- Botão de opções -->
          <button
            @click="toggleMenu(address.id)"
            class="text-gray-500 hover:text-gray-700 relative"
          >
            <MoreVertical class="w-5 h-5" />
          </button>

          <!-- Menu Dropdown -->
          <div
            v-if="openMenuId === address.id"
            class="absolute right-4 top-12 bg-white shadow-lg rounded-lg border w-36 z-10"
            v-click-outside="closeMenu"
          >
            <button
              @click="openModal(address)"
              class="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit class="w-4 h-4" /> Editar
            </button>
            <button
              class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash class="w-4 h-4" /> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="openModal()"
      class="cursor-pointer text-blue-600 text-sm border-t w-full border-gray-200 pt-2 !mt-4 flex items-center gap-1"
    >
      <Plus class="w-4 h-4" />
      Adicionar endereço
    </button>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Adicionar Endereço</h2>
          <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="grid gap-4">
          <div class="space-y-2">
            <label for="zip" class="text-sm font-medium">CEP</label>
            <input id="zip" v-model="newAddress.zip" placeholder="00000-000" class="input" />
          </div>
          <div class="space-y-2">
            <label for="state" class="text-sm font-medium">Estado</label>
            <input id="state" v-model="newAddress.state" class="input" />
          </div>
          <div class="space-y-2">
            <label for="street" class="text-sm font-medium">Rua</label>
            <input id="street" v-model="newAddress.street" class="input" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="number" class="text-sm font-medium">Número</label>
              <input id="number" v-model="newAddress.number" class="input" />
            </div>
            <div class="space-y-2">
              <label for="city" class="text-sm font-medium">Cidade</label>
              <input id="city" v-model="newAddress.city" class="input" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeModal" class="btn-secondary flex items-center gap-1">
            <X class="w-4 h-4" /> Cancelar
          </button>
          <button @click="saveAddress" class="btn-primary flex items-center gap-1">
            <Check class="w-4 h-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}
.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 8px 16px;
  border-radius: 6px;
}
</style>
