<script setup lang="ts">
import { getUser } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { onMounted, ref, shallowRef, defineAsyncComponent } from 'vue'
import type { User } from '@/interfaces/User'
import SidebarComponent from '@/components/Main/SidebarComponent.vue'

const componentsMap: Record<string, any> = {
  profile: defineAsyncComponent(() => import('@/components/Main/PerfilComponent.vue')),
  address: defineAsyncComponent(() => import('@/components/Main/AddressForm.vue')),
}

const activeComponent = shallowRef<any | null>(null)

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
  } else {
    console.error('Nenhum token encontrado')
  }
})

const selectComponent = (key: string) => {
  activeComponent.value = componentsMap[key] || null
}
</script>

<template>
  <div class="h-screen flex">
    <SidebarComponent
      :email="user.email"
      :name="user.name"
      :image="user.image_path"
      @selectComponent="selectComponent"
    />

    <div class="flex-1 flex justify-center items-center p-6">
      <component v-if="activeComponent" :is="activeComponent" />
      <p v-else class="text-gray-500">Selecione uma opção no menu.</p>
    </div>
  </div>
</template>
