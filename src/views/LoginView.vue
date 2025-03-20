<script setup lang="ts">
import { login } from '@/services/authService.ts'
import type { User } from '@/interfaces/Auth.ts'
import { ref } from 'vue'

const user = ref<User>({
  email: '',
  password: '',
})

const handleLogin = async () => {
  try {
    const response = await login(user.value)
  } catch (error) {
    console.log('Erro ao logar ' + error)
  }
}
</script>

<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2">
    <div class="flex items-center justify-center h-screen bg-white">
      <div class="text-black p-8 rounded-lg w-3/4">
        <div class="login-title">
          <h1 class="text-3xl mb-2 font-bold">Bem vindo!</h1>
          <p class="text-sm/6 text-gray-500 mb-2">Faça login para acessar</p>
        </div>
        <form action="">
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <div class="shrink-0 text-base text-gray-500 sselect-none sm:text-sm/6"></div>
              <input
                v-model="user.email"
                placeholder="email@example.com"
                type="text"
                name="email"
                id="email"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>

            <label for="password" class="block text-sm/6 font-medium text-gray-900">Senha</label>
            <div class="mb-2">
              <div
                class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              >
                <div class="shrink-0 text-base text-gray-500 sselect-none sm:text-sm/6"></div>
                <input
                  placeholder="********"
                  v-model="user.password"
                  type="password"
                  name="password"
                  id="password"
                  class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <button
            class="rounded-md cursor-pointer mt-2 w-full bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            @click="handleLogin"
          >
            Entrar
          </button>

          <button
            class="flex items-center justify-center gap-2 rounded-md mt-2 w-full bg-white py-2 px-4 border border-gray-300 text-center text-sm text-gray-700 transition-all shadow-md hover:shadow-lg focus:bg-gray-100 focus:shadow-none active:bg-gray-200 hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            type="button"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
              class="w-5 h-5"
            />
            Entrar com o Google
          </button>
        </form>
        <div>
          <p class="text-sm/6 text-gray-500 mt-2">
            Não tem uma conta?
            <a class="text-slate-800"><RouterLink to="register">Cadastre-se</RouterLink></a>
          </p>
        </div>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<style scoped>
.login-title {
  h1 {
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
}
</style>
