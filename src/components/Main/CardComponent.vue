<script setup lang="ts">
import { computed } from 'vue'

const baseURL = 'http://34.138.111.33:8000'

interface Discount {
  percentage?: number
}

interface Category {
  name: string
  description: string
}

interface Product {
  name: string
  price: string
  image_path: string
  stock: number
  category: Category
  discounts?: Discount[]
}

const props = defineProps<{ product: Product }>()

const hasDiscount = computed(() => (props.product.discounts ?? []).length > 0)

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const formattedPrice = computed(() => {
  const price = parseFloat(props.product.price)
  if (hasDiscount.value && props.product.discounts) {
    const discount = props.product.discounts[0].percentage || 0
    return formatCurrency(price * (1 - discount / 100))
  }
  return formatCurrency(price)
})

const originalPrice = computed(() => formatCurrency(parseFloat(props.product.price)))
</script>

<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
    <div
      v-if="hasDiscount"
      class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded"
    >
      Desconto
    </div>

    <div class="w-full bg-gray-100 hover:bg-gray-200 transition">
      <img :src="baseURL + product.image_path" alt="Produto" class="w-full h-52 object-cover" />
    </div>

    <div class="p-4">
      <h2 class="text-2xl font-bold text-gray-800 truncate">{{ product.name }}</h2>

      <p class="text-sm text-gray-500 mt-1">Categoria: {{ product.category.name }}</p>

      <!-- Preço -->
      <div class="flex items-center gap-2 mt-2">
        <p class="text-lg font-semibold text-gray-900">{{ formattedPrice }}</p>
        <p v-if="hasDiscount" class="text-sm text-red-500 line-through">{{ originalPrice }}</p>
      </div>

      <p class="text-sm text-gray-500 mt-1">
        <span class="font-medium">Estoque:</span> {{ product.stock }} disponível
      </p>

      <p class="text-sm text-gray-400 mt-2">{{ product.category.description }}</p>
    </div>

    <div class="flex justify-between p-4">
      <button
        class="bg-slate-800 text-white rounded-md px-4 py-2 text-sm hover:bg-slate-600 transition"
      >
        Adicionar ao Carrinho
      </button>
      <button
        class="bg-gray-300 text-gray-700 rounded-md px-4 py-2 text-sm hover:bg-gray-400 transition"
      >
        Detalhes
      </button>
    </div>
  </div>
</template>
