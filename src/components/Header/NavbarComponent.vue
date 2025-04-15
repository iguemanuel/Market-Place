<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Store, User, ShoppingBasket, Heart, Search, Menu } from 'lucide-vue-next'

// Controle do menu mobile
const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const route = useRoute()

const ocultNavbar = computed(() => {
  return route.name === 'Login' || route.name === 'Register' || route.name === 'Dashboard'
})
</script>
<template>
  <nav
    v-if="!ocultNavbar"
    class="flex justify-between gap-10 items-center p-4 bg-white text-black w-full font-sans px-16"
  >
    <button class="md:hidden text-black hover:scale-110" @click="toggleMenu">
      <Menu class="hover:text-gray-600" />
    </button>

    <div class="text-xl font-bold flex gap-1"><Store color="black" />Pampa</div>

    <div class="hidden md:flex items-center border border-gray-300 rounded-lg px-2 w-1/3">
      <Search color="gray" />
      <input type="text" placeholder="Buscar produtos" class="p-2 w-full outline-none" />
    </div>

    <div class="hidden md:flex">
      <ul class="flex space-x-5 gap-3">
        <li><RouterLink to="/" class="hover:text-gray-600">Home</RouterLink></li>
        <li><RouterLink to="/" class="hover:text-gray-600">Sobre</RouterLink></li>
        <li><RouterLink to="/" class="hover:text-gray-600">Contato</RouterLink></li>
      </ul>
    </div>

    <div class="hidden md:flex space-x-4 gap-3">
      <Heart class="cursor-pointer hover:text-gray-600" />
      <RouterLink to="/cart">
        <ShoppingBasket class="cursor-pointer hover:text-gray-600" />
      </RouterLink>
      <RouterLink to="/dashboard">
        <User class="cursor-pointer hover:text-gray-600" />
      </RouterLink>
    </div>

    <!-- Menu Mobile -->
    <div class="md:hidden flex gap-3 space-x-4">
      <Heart class="cursor-pointer hover:text-gray-600" />
      <RouterLink to="/cart">
        <ShoppingBasket class="cursor-pointer hover:text-gray-600" />
      </RouterLink>
      <ShoppingBasket class="cursor-pointer hover:text-gray-600" />
      <RouterLink to="/dashboard">
        <User class="cursor-pointer hover:text-gray-600" />
      </RouterLink>
    </div>

    <div
      v-if="menuOpen"
      class="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center text-center alig py-4 md:hidden"
    >
      <ul class="space-y-4">
        <li><RouterLink to="/" class="block">Home</RouterLink></li>
        <li><RouterLink to="/" class="block">Sobre</RouterLink></li>
        <li><RouterLink to="/" class="block">Contato</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>
