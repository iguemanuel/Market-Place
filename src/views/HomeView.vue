<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
  price: number
  image_path: string
  category?: {
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
      console.log('Produtos carregados:', data)
    }
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="w-full">
    <NavbarComponent />
    <CarouselComponent :banner="banners" />
    <div class="container-cards pl-4 pr-4">
      <h1>Produtos</h1>
      <div
        v-if="products.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <CardComponent v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>
