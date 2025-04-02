<script setup lang="ts">
import { getUser } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { onMounted, ref } from 'vue'
import { url } from '@/services/apiConfig'
import type { User } from '@/interfaces/Auth.ts'
import SidebarComponent from '@/components/Main/SidebarComponent.vue'

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
  <div class="container h-screen flex">
    <SidebarComponent :email="user.email" :name="user.name" :image="user.image_path" />
  </div>
</template>
