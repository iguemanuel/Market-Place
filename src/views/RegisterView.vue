<script setup lang="ts">
import { ref } from 'vue'
import { register } from '@/services/authService.ts'
import { useToast } from 'vue-toastification'
import { RouterLink } from 'vue-router'
import type { User } from '@/interfaces/User'

const toast = useToast()

const user = ref<User>({
  email: '',
  password: '',
  name: '',
})

const confirmEmail = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (user.value.email !== confirmEmail.value) {
    return toast.error('Os e-mails não coincidem')
  }
  if (user.value.password !== confirmPassword.value) {
    return toast.error('As senhas não coincidem')
  }

  try {
    const response = await register(user.value)
    console.log(response)
  } catch (error) {
    console.error('Erro ao registrar:', error)
  }
  console.log(user.value)
}
</script>

<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2">
    <div class="flex items-center justify-center h-screen bg-white">
      <div class="text-black p-8 rounded-lg w-3/4">
        <div class="login-title text-center">
          <h1 class="text-3xl !mb-4 font-bold">Registre-se</h1>
          <p class="text-sm text-gray-500 mb-2">Crie sua conta agora!</p>
        </div>
        <form @submit.prevent="handleRegister">
          <!-- Campo de Nome -->
          <label for="name" class="block text-sm font-medium text-gray-900">Nome</label>
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-200"
            >
              <input
                placeholder="Seu nome completo"
                type="text"
                name="name"
                id="name"
                v-model="user.name"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Campo de E-mail -->
          <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-200"
            >
              <input
                placeholder="email@example.com"
                type="email"
                name="email"
                id="email"
                v-model="user.email"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Confirmar E-mail -->
          <label for="confirmEmail" class="block text-sm font-medium text-gray-900"
            >Confirmar E-mail</label
          >
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-200"
            >
              <input
                v-model="confirmEmail"
                placeholder="email@example.com"
                type="email"
                name="confirmEmail"
                id="confirmEmail"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Campo de Senha -->
          <label for="password" class="block text-sm font-medium text-gray-900">Senha</label>
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-200"
            >
              <input
                placeholder="********"
                type="password"
                name="password"
                id="password"
                v-model="user.password"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Confirmar Senha -->
          <label for="confirmPassword" class="block text-sm font-medium text-gray-900"
            >Confirmar Senha</label
          >
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-200"
            >
              <input
                v-model="confirmPassword"
                placeholder="********"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Botão de Submissão -->
          <button
            type="submit"
            class="mt-2 w-full bg-slate-800 py-2 px-4 text-white rounded-md hover:bg-slate-700 focus:bg-slate-700"
          >
            Criar Conta
          </button>
          <button
            class="flex items-center justify-center gap-2 rounded-md mt-2 w-full bg-white py-2 px-4 border border-gray-300 text-center text-sm text-gray-700 transition-all shadow-md hover:shadow-lg focus:bg-gray-100 focus:shadow-none active:bg-gray-200 hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            type="submit"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
              class="w-5 h-5"
            />
            Entrar com o Google
          </button>
        </form>

        <!-- Link para Login -->
        <div class="mt-2">
          <p class="text-sm text-gray-500 inline">Já tem uma conta?</p>
          <RouterLink to="/login" class=" ">Faça o login</RouterLink>
        </div>
      </div>
    </div>

    <!-- Imagem no lado direito (apenas para dispositivo maiores) -->
    <div class="md:flex items-center justify-center sm:hidden">
      <img src="../assets/svg/market-place2.svg" alt="Market" class="w-2/3 h-2/3" />
    </div>
  </div>
</template>
