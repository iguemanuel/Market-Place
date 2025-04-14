<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { getUser, uploadUserImage } from '@/services/userService'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/interfaces/User'
import { url } from '@/services/apiConfig'
import { User as UserIcon, Mail, Shield, Upload, Loader2, Camera } from 'lucide-vue-next'

const baseUrl = url

const user = ref<User>({
  id: 0,
  name: '',
  email: '',
  password: '',
  role: '',
  image_path: '',
})

const selectedFile = ref<File | null>(null)
const isLoading = ref(true)
const isUploading = ref(false)
const toast = useToast()
const authStore = useAuthStore()

const userImageUrl = computed(() => {
  return user.value.image_path ? baseUrl + user.value.image_path : null
})

onMounted(async () => {
  isLoading.value = true
  if (authStore.token) {
    try {
      user.value = await getUser()
    } catch (error) {
      toast.error('Erro ao buscar informações do usuário.')
      console.error('Erro ao buscar informações do usuário:', error)
    }
  } else {
    toast.error('Nenhum token encontrado.')
  }
  isLoading.value = false
})

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  selectedFile.value = file
  isUploading.value = true

  try {
    const response = await uploadUserImage(file)
    user.value.image_path = response.image_path
    console.log('Imagem enviada com sucesso:', response)
    toast.success('Imagem enviada com sucesso!')
  } catch (error) {
    toast.error('Erro ao enviar a imagem.')
  } finally {
    isUploading.value = false
  }
}

const triggerFileInput = () => {
  document.getElementById('profile-image-input')?.click()
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      <UserIcon class="h-6 w-6 text-gray-700" />
      Perfil do Usuário
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <Loader2 class="h-8 w-8 text-gray-500 animate-spin" />
      <span class="ml-2 text-gray-500">Carregando perfil...</span>
    </div>

    <div v-else class="space-y-6">
      <div class="flex flex-col items-center gap-4 mb-6">
        <div class="relative group">
          <div v-if="userImageUrl" class="relative">
            <img
              :src="userImageUrl"
              alt="Foto de perfil"
              class="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow"
            />
            <button
              @click="triggerFileInput"
              class="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
              title="Alterar foto"
            >
              <Camera class="h-5 w-5" />
            </button>
          </div>

          <div
            v-else
            @click="triggerFileInput"
            class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <Camera class="h-10 w-10 text-gray-500" />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input
            type="file"
            id="profile-image-input"
            @change="handleFileChange"
            class="hidden"
            accept="image/*"
          />
          <button
            @click="triggerFileInput"
            class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors text-sm font-medium"
          >
            <Upload class="h-4 w-4" />
            {{ userImageUrl ? 'Alterar foto' : 'Adicionar foto' }}
          </button>
          <div v-if="isUploading" class="flex items-center text-sm text-gray-500">
            <Loader2 class="h-4 w-4 animate-spin mr-2" />
            Enviando...
          </div>
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg p-5 space-y-4">
        <div class="flex items-start gap-3">
          <UserIcon class="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500 font-medium">Nome</div>
            <div class="text-gray-800 font-medium">{{ user.name || 'Não informado' }}</div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Mail class="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500 font-medium">Email</div>
            <div class="text-gray-800">{{ user.email || 'Não informado' }}</div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Shield class="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500 font-medium">Função</div>
            <div class="text-gray-800 capitalize">{{ user.role || 'Não informado' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
