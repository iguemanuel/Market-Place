<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './store/authStore'
import NavbarComponent from './components/Header/NavbarComponent.vue'
import { computed } from 'vue'
import FooterComponent from './components/Footer/FooterComponent.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="w-full min-h-screen">
    <NavbarComponent />
    <RouterView />
    <FooterComponent />
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
  background-color: var(--vt-c-white-mute);
}
</style>
