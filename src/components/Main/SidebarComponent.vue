<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Home, ShoppingCart, User, Package, Heart, LogOut, X } from 'lucide-vue-next'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'

const menuItens = [
  { iconName: 'Perfil', icon: User, key: 'profile' },
  { iconName: 'Home', icon: Home, key: 'address' },
  { iconName: 'Carrinho', icon: ShoppingCart, key: 'cart' },
  { iconName: 'Pedidos', icon: Package, key: 'orders' },
  { iconName: 'Favoritos', icon: Heart, key: 'favorites' },
]

defineEmits(['selectComponent'])
const router = useRouter()
const authStore = useAuthStore()

const props = defineProps({
  email: String,
  name: String,
  image: String,
})

const logout = () => {
  authStore.clearUser()
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="flex flex-col h-full w-64 bg-white shadow-lg">
    <div class="flex items-center gap-2 px-4 py-4 border-b border-gray-200">
      <button
        @click="router.push({ name: 'Home' })"
        class="flex items-center text-gray-600 hover:text-gray-900 transition"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="ml-2 font-medium">Voltar</span>
      </button>
    </div>

    <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
      <div class="relative h-10 w-10 overflow-hidden rounded-full bg-gray-300">
        <img :src="image" alt="User" class="h-full w-full object-cover" />
      </div>
      <div>
        <p class="text-sm font-medium">{{ name }}</p>
        <p class="text-xs text-gray-500">{{ email }}</p>
      </div>
    </div>

    <nav class="flex-1 py-4 px-2">
      <button
        v-for="item in menuItens"
        :key="item.key"
        @click="$emit('selectComponent', item.key)"
        class="flex gap-2 cursor-pointer items-center w-full h-10 rounded-md px-3 text-sm font-medium transition hover:bg-gray-100"
      >
        <component :is="item.icon" class="mr-3 h-5 w-5" />
        {{ item.iconName }}
      </button>
    </nav>

    <div class="p-4">
      <button
        class="flex gap-2 cursor-pointer items-center w-full h-10 rounded-md bg-red-500 text-white px-3 text-sm font-medium hover:bg-red-600"
        @click="logout()"
        route
      >
        <LogOut class="mr-3 h-5 w-5" />
        Sair
      </button>
    </div>
  </div>
</template>
