<script setup lang="ts"></script>

<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2">
    <div class="flex items-center justify-center h-screen bg-white">
      <div class="text-black p-8 rounded-lg w-3/4">
        <div class="login-title text-center">
          <h1 class="text-3xl !mb-4 font-bold">Registre-se</h1>
          <p class="text-sm text-gray-500 mb-2">Crie sua conta agora!</p>
        </div>
        <form>
          <!-- Campo de Nome -->
          <label for="name" class="block text-sm font-medium text-gray-900">Nome</label>
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <input
                placeholder="Seu nome completo"
                type="text"
                name="name"
                id="name"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Campo de E-mail -->
          <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
          <div class="mb-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <input
                placeholder="email@example.com"
                type="email"
                name="email"
                id="email"
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
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <input
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
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <input
                placeholder="********"
                type="password"
                name="password"
                id="password"
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
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <input
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
        </form>

        <!-- Link para Login -->
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Já tem uma conta?
            <RouterLink to="/login" class="text-slate-800">Faça o login</RouterLink>
          </p>
        </div>
      </div>
    </div>

    <!-- Imagem no lado direito (apenas para dispositivo maiores) -->
    <div class="md:flex items-center justify-center sm:hidden">
      <img src="../assets/img/market-place2.svg" alt="Market" class="w-2/3 h-2/3" />
    </div>
  </div>
</template>
