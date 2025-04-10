<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories } from '@/services/categoriesService'
import { createProduct, getProducts } from '@/services/productsService'
import type { Category, NewProduct, Product } from '@/interfaces/Product'

const categories = ref<Category[]>([])
const loading = ref(false)
const products = ref<Product[]>([])
const imageFile = ref<File | null>(null)

const newProduct = ref<NewProduct>({
  name: '',
  description: '',
  price: '',
  image_path: '', // será preenchido após o upload
  stock: 0,
  categoryId: 0,
})

const fetchProducts = async () => {
  try {
    products.value = await getProducts()
  } catch (err) {
    console.error(err)
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await getCategories()
  } catch (err) {
    console.error(err)
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imageFile.value = file
  }
}

const uploadImage = async (): Promise<string> => {
  if (!imageFile.value) return ''
  const formData = new FormData()
  formData.append('file', imageFile.value)

  const response = await fetch('URL_DO_BACKEND/upload', {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  return data.image_path // ajusta isso conforme o backend
}

const handleAddProduct = async () => {
  if (!newProduct.value.categoryId) {
    alert('Por favor, selecione uma categoria.')
    return
  }

  loading.value = true
  try {
    const uploadedImagePath = await uploadImage()
    const productToSend = {
      ...newProduct.value,
      image_path: uploadedImagePath,
    }

    await createProduct(productToSend)
    await fetchProducts()
    resetForm()
  } catch (err) {
    console.error('Erro ao criar produto:', err)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  newProduct.value = {
    name: '',
    description: '',
    price: '',
    image_path: '',
    stock: 0,
    discounts: [],
    categoryId: 0,
  }
  imageFile.value = null
}

onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <div class="p-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-700">Gerenciar Produtos</h1>
        <p class="text-sm text-gray-500">Adicione e visualize os produtos cadastrados.</p>
      </div>

      <form @submit.prevent="handleAddProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newProduct.name"
          type="text"
          placeholder="Nome do produto"
          class="border p-2 rounded"
          required
        />
        <input
          v-model="newProduct.price"
          type="text"
          placeholder="Preço"
          class="border p-2 rounded"
          required
        />
        <input
          v-model="newProduct.stock"
          type="number"
          placeholder="Estoque"
          class="border p-2 rounded"
          required
        />

        <!-- Input de arquivo -->
        <label class="col-span-full">
          <span class="block mb-1 text-sm text-gray-600">Imagem do produto</span>
          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="border p-2 rounded w-full"
          />
        </label>

        <select v-model="newProduct.categoryId" class="border p-2 rounded" required>
          <option disabled value="">Selecione uma categoria</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <textarea
          v-model="newProduct.description"
          placeholder="Descrição"
          class="border p-2 rounded col-span-full"
        ></textarea>

        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded col-span-full"
          :disabled="loading"
        >
          {{ loading ? 'Salvando...' : 'Adicionar Produto' }}
        </button>
      </form>
    </div>
  </div>
</template>
