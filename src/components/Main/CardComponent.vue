<script setup lang="ts">
import { computed, ref } from 'vue'
import { ShoppingCart, Heart } from 'lucide-vue-next'
import type { Product } from '@/interfaces/Product'
import { url } from '@/services/apiConfig'

const baseURL = url
const props = defineProps<{ product: Product }>()
const hasDiscount = computed(() => (props.product.discounts ?? []).length > 0)
const isFavorited = computed(() => false)

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const formattedPrice = computed(() => {
  const price = parseFloat(props.product.price)
  if (hasDiscount.value && props.product.discounts?.length) {
    const discount = props.product.discounts[0].percentage || 0
    return formatCurrency(price * (1 - discount / 100))
  }
  return formatCurrency(price)
})

const originalPrice = computed(() => formatCurrency(parseFloat(props.product.price)))

function descriptionTruncate(description: string) {
  if (!description) {
    return 'Sem descrição'
  }
  return description.length > 100 ? `${description.slice(0, 100)}...` : description
}
</script>

<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
    <div class="w-full bg-gray-300 hover:bg-gray-200 transition relative">
      <img :src="baseURL + product.image_path" alt="Produto" class="w-full h-52 object-cover" />
      <button class="absolute top-2 right-2" @click="isFavorited = !isFavorited">
        <Heart class="text-gray-800 cursor-pointer" :fill="isFavorited ? '#1e2939' : 'none'" />
      </button>
    </div>

    <div class="p-4">
      <h2 class="text-2xl font-bold text-gray-800 truncate">{{ product.name }}</h2>
      <p class="text-sm text-gray-500 mt-1">Categoria: {{ product.category.name }}</p>

      <div class="flex items-center gap-2 mt-2">
        <p class="text-lg font-semibold text-gray-900">{{ formattedPrice }}</p>
        <p v-if="hasDiscount" class="text-sm text-red-500 line-through">{{ originalPrice }}</p>
      </div>

      <p class="text-sm text-gray-500 mt-1">
        <span class="font-medium">Estoque:</span> {{ product.stock }} disponível
      </p>

      <p class="text-sm text-gray-400 mt-2">
        {{ descriptionTruncate(product.category?.description ?? '') }}
      </p>
    </div>

    <div class="flex justify-between p-4">
      <button
        class="bg-gray-800 text-gray-700 rounded-md px-4 py-2 text-sm hover:bg-gray-400 transition"
      >
        <ShoppingCart class="w-6 h-6 text-white" />
      </button>
      <button
        class="bg-gray-300 text-gray-700 rounded-md px-4 py-2 text-sm hover:bg-gray-400 transition"
      >
        Detalhes
      </button>
    </div>
  </div>
</template>
