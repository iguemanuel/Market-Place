<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Category, NewCategory } from '@/interfaces/Product'
import {
  getCategories,
  createCategory,
  deleteCategories,
  updateCategories,
} from '@/services/categoriesService'

const category = ref<Category>({
  id: 0,
  name: '',
  description: '',
  image_path: '',
})

const categories = ref<Category[]>([])
const selectedCategoryId = ref<number | null>(null)
const isEditing = ref(false)

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
  }
})

watch(selectedCategoryId, (id) => {
  if (id !== null) {
    const selected = categories.value.find((cat) => cat.id === id)
    if (selected) {
      category.value = { ...selected }
      isEditing.value = true
    }
  }
})

const handleSubmit = async () => {
  try {
    if (isEditing.value && category.value.id) {
      await updateCategories(String(category.value.id), category.value)
      const index = categories.value.findIndex((cat) => cat.id === category.value.id)
      if (index !== -1) categories.value[index] = { ...category.value }
    } else {
      const newCategory: NewCategory = {
        name: category.value.name,
        description: category.value.description,
        image_path: category.value.image_path,
      }
      const created = await createCategory(newCategory)
      categories.value.push(created)
    }

    resetForm()
  } catch (error) {
    console.error('Erro ao salvar categoria:', error)
  }
}

const deleteCategory = async (id: number) => {
  try {
    await deleteCategories(id)
    categories.value = categories.value.filter((category) => category.id !== id)
    if (selectedCategoryId.value === id) resetForm()
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
  }
}

const resetForm = () => {
  category.value = {
    id: 0,
    name: '',
    description: '',
    image_path: '',
  }
  selectedCategoryId.value = null
  isEditing.value = false
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-5">
    <div class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 class="text-lg font-semibold mb-4">Criar/Editar Categorias</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="categoryName" class="block text-sm font-medium text-gray-600"
            >Nome da categoria</label
          >
          <input
            type="text"
            id="categoryName"
            v-model="category.name"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="categoryDescription" class="block text-sm font-medium text-gray-600"
            >Descrição</label
          >
          <textarea
            id="categoryDescription"
            v-model="category.description"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {{ isEditing ? 'Atualizar' : 'Salvar' }}
          </button>

          <button
            type="button"
            @click="resetForm"
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 class="text-lg font-semibold mb-4">Selecionar Categoria:</h2>

      <h3 class="font-semibold mb-4">Categorias cadastradas:</h3>
      <select
        v-model="selectedCategoryId"
        class="w-full mt-1 p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>Selecione uma categoria</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <button
        @click="selectedCategoryId !== null && deleteCategory(selectedCategoryId)"
        :disabled="!selectedCategoryId"
        class="!mt-5 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
      >
        Deletar Categoria
      </button>
    </div>
  </div>
</template>
