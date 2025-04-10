<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Category, NewCategory } from '@/interfaces/Product'
import {
  getCategories,
  createCategory,
  deleteCategories,
  updateCategories,
} from '@/services/categoriesService'
import { Check, Eraser, Trash, Trash2 } from 'lucide-vue-next'

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
    const selected = categories.value.find((cat) => cat.id === Number(id))
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
  <div class="grid">
    <div
      class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto flex flex-col justify-between min-h-[400px] min-w-[500px]"
    >
      <div class="flex-grow">
        <h2 class="text-lg font-semibold mb-4">Criar/Editar Categorias</h2>

        <div class="flex-grow">
          <h2 class="text-md font-semibold !text-gray-700 mb-4">
            Selecione uma categoria para editar ou crie-a:
          </h2>

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
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="categoryName" class="block text-sm font-medium text-gray-600">
              Nome da categoria
            </label>
            <input
              type="text"
              id="categoryName"
              v-model="category.name"
              class="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label for="categoryDescription" class="block text-sm font-medium text-gray-600">
              Descrição
            </label>
            <textarea
              id="categoryDescription"
              v-model="category.description"
              class="w-full mt-1 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </form>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          type="submit"
          @click="handleSubmit"
          class="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          <Check />
          {{ isEditing ? 'Atualizar' : 'Salvar' }}
        </button>

        <button
          type="button"
          @click="resetForm"
          class="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
        >
          <Eraser />
          Limpar
        </button>

        <!-- Botão Deletar -->
        <button
          @click="selectedCategoryId && deleteCategory(Number(selectedCategoryId))"
          :disabled="!selectedCategoryId"
          class="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
        >
          <Trash2 />
          Deletar
        </button>
      </div>
    </div>
  </div>
</template>
