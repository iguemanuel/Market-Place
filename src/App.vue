<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full min-h-screen">
    <RouterView />
  </div>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
