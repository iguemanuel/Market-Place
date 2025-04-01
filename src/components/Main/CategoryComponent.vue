<script setup lang="ts">
import { computed } from 'vue'
import { url } from '@/services/apiConfig'

const baseURL = url

const props = defineProps<{
  category: {
    id: number
    name: string
  }
}>()

const categoryLink = computed(() => `#${props.category.name}`)
</script>

<template>
  <a :href="categoryLink" class="card-category">
    <p class="category-title">{{ props.category.name }}</p>
  </a>
</template>

<style scoped>
.card-category {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #1e293b; /* Azul escuro melhorado */
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.card-category:hover {
  background-color: #334155; /* Um tom mais claro no hover */
  transform: translateY(-2px);
}

.category-title {
  color: white;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>
