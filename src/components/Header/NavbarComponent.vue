<template>
  <nav class="flex justify-between items-center p-4 bg-white text-black w-full font-sans">
    <div class="logo">
      <h1 class="text-xl font-bold">Pampa Market</h1>
    </div>
    <div>
      <input type="text" placeholder="Buscar produtos" class="p-2 rounded-lg border" />
    </div>
    <ul class="flex space-x-4 mr-4">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/">Sobre</RouterLink></li>
      <li><RouterLink to="/">Contato</RouterLink></li>
      <div class="flex ml-4 space-x-4">
        <User />
        <ShoppingBasket />
        <Heart />
      </div>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { User, ShoppingBasket, Heart } from 'lucide-vue-next'
</script>
