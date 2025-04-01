<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/authStore'

import FooterComponent from '@/components/Footer/FooterComponent.vue'
import CarouselComponent from '@/components/Main/CarouselComponent.vue'
import CardComponent from '@/components/Main/CardComponent.vue'

import { produtos } from '@/services/httpService'
import type { Product, Category } from '@/interfaces/Product'
import CategoryComponent from '@/components/Main/CategoryComponent.vue'

const authStore = useAuthStore()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await produtos()
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
    loading.value = false
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
    <div>
      <h2 class="text-2xl font-bold">Categorias</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="category in categories" :key="category.id" class="mb-4">
          <CategoryComponent :category="category" />
        </div>
      </div>
    </div>

    <div v-for="(items, category) in categorizedProducts" :key="category" :id="category">
      <h2>{{ category }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CardComponent v-for="product in items" :key="product.id" :product="product" />
      </div>
    </div>

    <FooterComponent />
  </div>
</template>
