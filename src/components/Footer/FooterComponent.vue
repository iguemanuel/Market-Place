<template>
  <footer class="bg-gray-100 w-full">
    <div class="flex justify-center">
      <div class="container mx-auto py-8 flex justify-center text-center">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl">
          <div>
            <h2 class="text-xl font-bold">Pampa</h2>
            <p class="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h2 class="text-xl font-bold">Links</h2>
            <ul class="space-y-2">
              <li><RouterLink to="/">Home</RouterLink></li>
              <li><RouterLink to="/">Sobre</RouterLink></li>
              <li><RouterLink to="/">Contato</RouterLink></li>
            </ul>
          </div>

          <div>
            <h2 class="text-xl font-bold">Contato</h2>
            <p class="text-gray-500">Rua Lorem Ipsum, 123</p>
            <p class="text-gray-500">Bairro Ipsum, Cidade - UF</p>
            <p class="text-gray-500">CEP: 12345-678</p>
            <p class="text-gray-500">Telefone: (12) 3456-7890</p>
          </div>

          <div>
            <h2 class="text-xl font-bold">Redes Sociais</h2>
            <ul class="flex justify-center space-x-4 gap-4">
              <li>
                <a href="#"><Instagram /></a>
              </li>
              <li>
                <a href="#"><Twitter /></a>
              </li>
              <li>
                <a href="#"><FacebookIcon /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FacebookIcon, Twitter, Instagram } from 'lucide-vue-next'
</script>
