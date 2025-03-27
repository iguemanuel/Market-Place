<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  category: string
}>()
</script>

<template>
  <!-- Envolvendo a div inteira com o link -->
  <a :href="'#' + props.category" class="card-category">
    <div>
      <h2 class="category-title">{{ props.category }}</h2>
    </div>
  </a>
</template>

<style scoped>
.card-category {
  display: block; /* Faz o link ocupar o espaço da div inteira */
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #f7fafc;
  text-decoration: none; /* Remove a decoração padrão do link */
  cursor: pointer;
}

.category-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
