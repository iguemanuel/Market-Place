<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/authStore'

import FooterComponent from '@/components/Footer/FooterComponent.vue'
import CarouselComponent from '@/components/Main/CarouselComponent.vue'
import CardComponent from '@/components/Main/CardComponent.vue'

import { getProdutos } from '@/services/httpService'
import type { Product, Category } from '@/interfaces/Product'
import CategoryComponent from '@/components/Main/CategoryComponent.vue'

const authStore = useAuthStore()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    const data = await getProdutos()
    if (Array.isArray(data)) {
      products.value = data
      categories.value = Array.from(
        new Map(
          data
            .filter((product) => product.category)
            .map((product) => [product.category.id, product.category]),
        ).values(),
      )
    }
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error)
  } finally {
  }
})

const categorizedProducts = computed(() => {
  return products.value.reduce(
    (acc, product) => {
      const categoryName = product.category?.name || 'Outros'
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(product)
      return acc
    },
    {} as Record<string, Product[]>,
  )
})
</script>
<template>
  <div class="w-full">
    <CarouselComponent />
    <div class="container px-16 py-8 !mx-auto">
      <!-- Adicionei mx-auto aqui -->
      <div>
        <h2 class="text-3xl text-center !mb-8 !font-extrabold">Categorias</h2>
        <div class="mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div v-for="category in categories" :key="category.id" class="mb-4">
            <CategoryComponent :category="category" />
          </div>
        </div>
      </div>

      <div v-for="(items, category) in categorizedProducts" :key="category" :id="category">
        <h2
          class="text-3xl text-center !mb-8 !mt-8 !font-extrabold bg-white rounded-2xl py-3 border-b border-gray-200"
        >
          {{ category }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <CardComponent v-for="product in items" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>
