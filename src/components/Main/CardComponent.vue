<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
    <!-- Imagem do Produto -->
    <div class="w-full bg-amber-100 duration-500 hover:bg-amber-200">
      <img :src="product.image_path" alt="Produto" class="w-full h-52 object-cover duration-500" />
    </div>

    <div class="p-4">
      <!-- Nome do Produto -->
      <h2 class="text-2xl font-bold text-gray-800 truncate">{{ product.name }}</h2>

      <!-- Categoria do Produto -->
      <p class="text-sm text-gray-500 mt-1">{{ product.category.name }}</p>

      <!-- Preço do Produto -->
      <p class="text-lg font-semibold text-gray-900 mt-2">
        ${{ parseFloat(product.price).toFixed(2) }}
      </p>

      <!-- Estoque -->
      <p class="text-sm text-gray-500 mt-1">
        <span class="font-medium">Estoque:</span> {{ product.stock }} disponível
      </p>

      <!-- Descrição da Categoria -->
      <p class="text-sm text-gray-400 mt-2">Categoria: {{ product.category.description }}</p>
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

<script setup>
import { ref } from 'vue'

// Dados do produto simulados (pode ser passado como prop ou obtido de uma API)
const product = ref({
  id: 11,
  name: 'Teste',
  price: '1.00',
  stock: 1,
  image_path: '/src/assets/img/headset.png',
  category: {
    name: 'Computers',
    description: 'The best computers are only here.',
    id: 1,
    user_id: 1,
  },
})
</script>

<style scoped>
/* Estilos adicionais podem ser colocados aqui */
</style>
