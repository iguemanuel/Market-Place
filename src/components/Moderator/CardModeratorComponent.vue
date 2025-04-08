<script setup lang="ts">
const props = defineProps<{
  icon: any
  title: string
  subtitle: string
  description: string
  buttonText?: string
}>()

defineEmits(['click'])
</script>

<template>
  <div class="rounded-xl shadow-sm bg-white">
    <div class="p-6">
      <div class="flex items-center gap-2 text-xl font-semibold">
        <component :is="icon" class="h-5 w-5" />
        <h2 class="!font-semibold !text-gray-700">{{ title }}</h2>
      </div>
      <p class="text-sm text-gray-500">{{ subtitle }}</p>
    </div>
    <div class="p-6">
      <p>{{ description }}</p>
    </div>
    <div class="p-5">
      <button
        @click="$emit('click')"
        class="btn-primary cursor-pointer text-white bg-gray-700 px-3 py-3 rounded-md hover:bg-gray-800 transition"
      >
        {{ buttonText || 'Editar' }}
      </button>
    </div>
  </div>
</template>
