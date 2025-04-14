<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { X, Check } from 'lucide-vue-next'
import { createProduct } from '@/services/productsService'
import type { Product, NewProduct, Category } from '@/interfaces/Product'

const selectedFile = ref<File | null>(null)
const imageUrl = ref<string | null>(null)

const props = defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', product: Product): void
}>()

const newProduct = ref<NewProduct>({
  name: '',
  price: 0,
  stock: 0,
  category_id: 0,
  description: '',
  image: '',
})

function closeModal() {
  emit('close')
}
const saveProduct = async () => {
  try {
    const productData = { ...newProduct.value }

    if (selectedFile.value) {
      const productCreated = await createProduct(productData, selectedFile.value)
      console.log('Produto criado:', productCreated)
      emit('save', productCreated)
      closeModal()
    } else {
      const productCreated = await createProduct(productData, null)
      console.log('Produto criado sem imagem:', productCreated)
      emit('save', productCreated)
      closeModal()
    }
  } catch (error) {
    console.error('Erro ao salvar produto:', error)
    alert('Erro ao salvar produto. Verifique os dados e tente novamente.')
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  selectedFile.value = file

  const formData = new FormData()
  formData.append('image', file)
  imageUrl.value = URL.createObjectURL(file)
}

onMounted(() => {
  console.log(props.categories)
})
</script>

<template>
  <div class="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Adicionar Produto</h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="grid gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Nome</label>
          <input
            v-model="newProduct.name"
            placeholder="Nome do produto"
            class="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Categoria</label>
          <select
            v-model="newProduct.category_id"
            class="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option disabled value="0">Selecione uma categoria</option>
            <option v-for="cat in props.categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Preço</label>
            <input
              v-model.number="newProduct.price"
              type="number"
              placeholder="R$ 0,00"
              class="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Estoque</label>
            <input
              v-model.number="newProduct.stock"
              type="number"
              placeholder="0"
              class="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Descrição</label>
          <textarea
            v-model="newProduct.description"
            rows="3"
            placeholder="Descrição do produto"
            class="w-full border border-gray-300 px-3 py-2 rounded resize-none"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Imagem do Produto</label>

          <div
            class="relative border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-gray-50 hover:border-blue-400 transition"
          >
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span class="text-gray-500 text-sm">Clique para enviar uma imagem</span>
          </div>
        </div>

        <div v-if="imageUrl" class="mt-4">
          <label class="text-sm font-medium block mb-2 text-gray-700">Prévia da imagem</label>
          <div
            class="h-15 border overflow-hidden bg-white shadow-sm flex items-center justify-center"
          >
            <img :src="imageUrl" alt="Prévia da imagem" class="max-h-full object-contain" />
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2 !mt-6">
        <button
          @click="closeModal"
          class="px-4 py-2 rounded-sm text-gray-800 bg-gray-200 hover:bg-gray-300 duration-300 flex items-center gap-1"
        >
          <X class="w-4 h-4" /> Cancelar
        </button>
        <button
          @click="saveProduct"
          class="px-4 py-2 rounded-sm text-white bg-blue-600 hover:bg-blue-700 duration-300 flex items-center gap-1"
        >
          <Check class="w-4 h-4" /> Salvar
        </button>
      </div>
    </div>
  </div>
</template>
