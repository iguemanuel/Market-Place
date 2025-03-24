<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface ProductCarouselProps {
  products: Product[]
}

// Definir valor padrão para props.products se não for passado
const props = defineProps<ProductCarouselProps>()
const products = props.products || [] // Caso não tenha produtos, usamos um array vazio.

const currentIndex = ref(0)

// Auto-avançar o carrossel se houver produtos
let interval: ReturnType<typeof setInterval> | null = null

const startAutoSlide = () => {
  if (products.length > 0) {
    interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % products.length
    }, 5000)
  }
}

onMounted(() => {
  startAutoSlide()
})

// Reinicia o slide quando a lista de produtos muda
watch(
  () => products,
  () => {
    currentIndex.value = 0
    if (interval) clearInterval(interval)
    startAutoSlide()
  },
)

const goToPrevious = () => {
  if (products.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + products.length) % products.length
  }
}

const goToNext = () => {
  if (products.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % products.length
  }
}
</script>

<template>
  <div v-if="products.length" class="relative rounded-xl overflow-hidden">
    <div class="aspect-[16/9] md:aspect-[21/9] relative">
      <img
        :src="products[currentIndex].image || '/placeholder.svg'"
        :alt="products[currentIndex].name"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6"
      >
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
          {{ products[currentIndex].name }}
        </h3>
        <p class="text-white/90 mb-1">{{ products[currentIndex].category }}</p>
        <p class="text-xl font-semibold text-white">
          ${{ products[currentIndex].price.toFixed(2) }}
        </p>
      </div>
    </div>

    <button
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
      @click="goToPrevious"
    >
      <ChevronLeft class="h-6 w-6" />
      <span class="sr-only">Previous slide</span>
    </button>

    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
      @click="goToNext"
    >
      <ChevronRight class="h-6 w-6" />
      <span class="sr-only">Next slide</span>
    </button>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(product, index) in products"
        :key="index"
        class="w-2 h-2 rounded-full"
        :class="{ 'bg-white': index === currentIndex, 'bg-white/50': index !== currentIndex }"
        @click="currentIndex = index"
      >
        <span class="sr-only">Go to slide {{ index + 1 }}</span>
      </button>
    </div>
  </div>

  <p v-else class="text-center text-gray-500">Nenhum produto disponível</p>
</template>
