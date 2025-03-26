<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import NavbarComponent from '@/components/Header/NavbarComponent.vue'
import CarouselComponent from '@/components/Main/CarouselComponent.vue'
import { produtos } from '@/services/httpService'
import CardComponent from '@/components/Main/CardComponent.vue'

const banners = [
  {
    id: 3,
    name: 'Produto 2',
    price: 19.99,
    image: '/src/assets/img/banner2.png',
    category: 'Categoria 3',
  },
  {
    id: 4,
    name: 'Produto 3',
    price: 39.99,
    image: '/src/assets/img/banner3.png',
    category: 'Categoria 4',
  },
  {
    id: 5,
    name: 'Produto 4',
    price: 49.99,
    image: '/src/assets/img/banner4.png',
    category: 'Categoria 4',
  },
]

interface Product {
  id: number
  name: string
  price: string
  image_path: string
  category: {
    name: string
    description: string
    id: number
  }
  image: string
  stock: number
  discounts?: []
}

const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await produtos()
    if (Array.isArray(data)) {
      products.value = data
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
    <NavbarComponent />
    <CarouselComponent :banner="banners" />

    <div class="container"></div>
    <div class="container-cards pl-4 pr-4">
      <h1>Produtos</h1>

      <div v-if="products.length > 0">
        <div v-for="(items, category) in categorizedProducts" :key="category" class="mb-6">
          <h2 class="text-xl font-bold mt-6">{{ category }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CardComponent v-for="product in items" :key="product.id" :product="product" />
          </div>
        </div>
      </div>

      <div v-else-if="loading" class="text-center">Carregando produtos...</div>
      <div v-else class="text-center text-gray-500">Nenhum produto encontrado.</div>
    </div>

    <FooterComponent />
  </div>
</template>
