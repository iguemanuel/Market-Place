<script setup lang="ts">
import { defineProps } from 'vue'
import { url } from '@/services/apiConfig'

const baseURL = url

const props = defineProps<{
  category: {
    id: number
    name: string
    image_path: string
  }
}>()
</script>
<template>
  <a :href="'#' + props.category.name" class="card-category">
    <div>
      <img :src="baseURL + props.category.image_path" alt="Imagem da categoria" />
    </div>
    <div>
      <h2 class="category-title">{{ props.category.name }}</h2>
    </div>
  </a>
</template>

<style scoped>
.card-category {
  display: block;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #f7fafc;
  text-decoration: none;
  cursor: pointer;
}

.category-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
