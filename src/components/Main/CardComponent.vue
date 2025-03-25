<script setup>
import { computed } from 'vue'
import { api } from '@/services/apiConfig'

const baseURL = 'http://34.138.111.33:8000'

const props = defineProps({
  product: Object,
})

const hasDiscount = computed(() => props.product.discounts && props.product.discounts.length > 0)

const formattedPrice = computed(() => {
  if (hasDiscount.value) {
    const discount = props.product.discounts[0].percentage || 0 // Exemplo: desconto como percentual
    return (parseFloat(props.product.price) * (1 - discount / 100)).toFixed(2)
  }
  return parseFloat(props.product.price).toFixed(2)
})

const originalPrice = computed(() => parseFloat(props.product.price).toFixed(2))
</script>

<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
    <!-- Selo de Desconto -->
    <div
      v-if="hasDiscount"
      class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded"
    >
      Desconto
    </div>

    <!-- Imagem do Produto -->
    <div class="w-full bg-gray-100 hover:bg-gray-200 transition">
      <img :src="baseURL + product.image_path" alt="Produto" class="w-full h-52 object-cover" />
    </div>

    <div class="p-4">
      <!-- Nome do Produto -->
      <h2 class="text-2xl font-bold text-gray-800 truncate">{{ product.name }}</h2>

      <!-- Categoria -->
      <p class="text-sm text-gray-500 mt-1">Categoria: {{ product.category.name }}</p>

      <!-- Preço -->
      <div class="flex items-center gap-2 mt-2">
        <p class="text-lg font-semibold text-gray-900">${{ formattedPrice }}</p>
        <p v-if="hasDiscount" class="text-sm text-red-500 line-through">${{ originalPrice }}</p>
      </div>

      <!-- Estoque -->
      <p class="text-sm text-gray-500 mt-1">
        <span class="font-medium">Estoque:</span> {{ product.stock }} disponível
      </p>

      <!-- Descrição da Categoria -->
      <p class="text-sm text-gray-400 mt-2">{{ product.category.description }}</p>
    </div>

    <div class="flex justify-between p-4">
      <button
        class="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600 transition"
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
