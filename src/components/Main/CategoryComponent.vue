<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  category: {
    name: string
    description: string
    image?: string
  }
}

const props = defineProps<Props>()
const router = useRouter()

const goToCategory = () => {
  router.push({ name: 'Category', params: { category: props.category.name } })
}
</script>
<template>
  <div
    class="cursor-pointer rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105 bg-white"
    @click="goToCategory"
  >
    <img
      :src="category.image || '/placeholder.jpg'"
      :alt="category.name"
      class="w-full h-32 object-cover rounded-md"
    />
    <h3 class="mt-2 font-bold text-lg">{{ category.name }}</h3>
  </div>
</template>
