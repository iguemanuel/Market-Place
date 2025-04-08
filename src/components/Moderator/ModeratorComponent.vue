<script setup lang="ts">
import { ref } from 'vue'
import { CandlestickChart, Package, Tag, UserPen } from 'lucide-vue-next'

import CardModeratorComponent from './CardModeratorComponent.vue'
import CategoryManagerComponent from './CategoryManagerComponent.vue'

const currentSection = ref<'home' | 'categories'>('home')
</script>

<template>
  <div class="p-6">
    <button
      v-if="currentSection !== 'home'"
      @click="currentSection = 'home'"
      class="mb-4 text-blue-600 hover:underline text-sm"
    >
      ← Voltar para o painel
    </button>

    <div v-if="currentSection === 'home'">
      <div class="!mb-5">
        <h1 class="text-2xl font-semibold text-gray-700">Gerenciar loja</h1>
        <p class="text-sm text-gray-500">Aqui você pode gerenciar todos os aspectos da loja.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <CardModeratorComponent
          :icon="Package"
          title="Gerenciar produtos"
          subtitle="Organize os produtos disponíveis na loja."
          description="Adicione, edite ou remova produtos da loja. Você pode gerenciar preços, descrições e imagens dos produtos."
        />

        <CardModeratorComponent
          :icon="Tag"
          title="Gerenciar categorias"
          subtitle="Organize os produtos em categorias."
          description="Adicione, edite ou remova categorias para organizar os produtos. Isso ajuda os clientes a encontrar o que estão procurando."
          @click="currentSection = 'categories'"
        />

        <CardModeratorComponent
          :icon="CandlestickChart"
          title="Gerenciar Estoque"
          subtitle="Mantenha o controle do estoque."
          description="Adicione, edite ou remova produtos do estoque. Isso ajuda a manter o controle do que está disponível para venda."
        />

        <CardModeratorComponent
          :icon="UserPen"
          title="Gerenciar usuários"
          subtitle="Gerencie os usuários da plataforma."
          description="Adicione, edite ou remova usuários da plataforma. Você pode gerenciar permissões e roles dos usuários."
        />
      </div>
    </div>

    <CategoryManagerComponent v-if="currentSection === 'categories'" />
  </div>
</template>
