<script setup lang="ts">
import { getUser } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { onMounted, ref } from 'vue'
import { url } from '@/services/apiConfig'
import type { User } from '@/interfaces/Auth.ts'

const baseURL = url
const authStore = useAuthStore()

const user = ref<User>({
  id: 0,
  name: '',
  email: '',
  password: '',
  role: '',
  image_path: '',
})

onMounted(async () => {
  if (authStore.token) {
    user.value = await getUser(authStore.token)
    console.log(user.value)
  } else {
    console.error('Nenhum token encontrado')
  }
})
</script>

<template>
  <div class="container px-16 py-8 mx-auto">
    <div
      class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 justify-center items-center text-center"
    >
      <img
        v-if="user.image_path"
        :src="baseURL + user.image_path"
        alt="Imagem do usuário"
        class="w-full h-full object-cover"
      />
    </div>
    <p v-if="user">Bem-vindo, {{ user.name }}</p>
  </div>
</template>
