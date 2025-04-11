<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getProducts, deleteProductById } from '@/services/productsService'
import { Pencil, Trash2 } from 'lucide-vue-next'
import ModalManagerComponent from './ModalProductManagerComponent.vue'
import { getCategories } from '@/services/categoriesService'
import type { Product } from '@/interfaces/Product'

const router = useRouter()
const products = ref<Product[]>([])
const selectedCategory = ref('Todos')
const showModal = ref(false)
const categories = ref([])

const fetchCategories = async () => {
  try {
    categories.value = await getCategories()
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
  }
}

const fetchProducts = async () => {
  try {
    products.value = await getProducts()
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

onMounted(async () => {
  await fetchProducts()
  await fetchCategories()
})

const deleteProduct = async (id: number) => {
  const confirmDelete = confirm('Tem certeza que deseja deletar este produto?')
  if (!confirmDelete) return

  try {
    await deleteProductById(id)
    products.value = products.value.filter((p) => p.id !== id)
  } catch (error) {
    alert('Erro ao deletar produto.')
  }
}

function modal() {
  showModal.value = !showModal.value
}

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Todos') return products.value
  return products.value.filter((p) => p.category.name === selectedCategory.value)
})

const uniqueCategories = computed(() => {
  const categories = products.value.map((p) => p.category.name)
  return [...new Set(categories)]
})

function nameTruncate(name: string) {
  if (!name) {
    return 'Sem nome'
  }
  return name.length > 50 ? `${name.slice(0, 50)}...` : name
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div
        class="px-6 py-5 border-b border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold text-gray-800">Todos os Produtos</h2>
          <p class="text-sm text-gray-500">Gerencie os produtos cadastrados no sistema</p>
        </div>

        <button
          class="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
          type="button"
          @click="modal()"
        >
          Adicionar Produto
        </button>

        <ModalManagerComponent :categories="categories" v-if="showModal" @close="modal()" />
      </div>

      <div class="px-6 pb-4 !mt-3 flex flex-wrap items-center gap-4">
        <label for="category" class="text-sm font-medium text-gray-700"
          >Filtrar por categoria:</label
        >
        <select id="category" v-model="selectedCategory" class="border rounded px-3 py-2 text-sm">
          <option value="Todos">Todos</option>
          <option v-for="(cat, index) in uniqueCategories" :key="index" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="overflow-x-auto max-h-[500px] overflow-y-auto sm:rounded-b-2xl">
        <table class="min-w-[600px] w-full table-auto text-sm text-gray-700">
          <thead class="bg-gray-50 text-gray-600 sticky top-0">
            <tr>
              <th class="px-6 py-3 text-left font-medium">ID</th>
              <th class="px-6 py-3 text-left font-medium">Nome</th>
              <th class="px-6 py-3 text-left font-medium">Sub-Categoria</th>
              <th class="px-6 py-3 text-left font-medium hidden md:table-cell">Preço</th>
              <th class="px-6 py-3 text-left font-medium hidden md:table-cell">Estoque</th>
              <th class="px-6 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4">{{ product.id }}</td>
              <td class="px-6 py-4 font-medium max-w-[200px] truncate" :title="product.name">
                {{ nameTruncate(product.name) }}
              </td>
              <td class="px-6 py-4 font-medium">{{ product.category.name }}</td>

              <td class="px-6 py-4 hidden md:table-cell">R$ {{ product.price }}</td>
              <td class="px-6 py-4 hidden md:table-cell">{{ product.stock }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    class="cursor-pointer text-gray-600 hover:text-blue-500 transition"
                    title="Editar"
                  >
                    <Pencil class="w-5 h-5" />
                  </button>

                  <button
                    @click="deleteProduct(product.id)"
                    class="cursor-pointer text-grays-500 hover:text-red-500 transition"
                    title="Deletar"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="px-6 py-6 text-center text-gray-500">
                Nenhum produto encontrado para a categoria selecionada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
