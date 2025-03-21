<script setup lang="ts">
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import NavbarComponent from '@/components/Header/NavbarComponent.vue'
</script>

<template>
  <div class="w-full">
    <NavbarComponent />
    <img
      src="../assets/img/banner-black-friday.png"
      alt="Banner Black Friday"
      class="w-full h-1/6 object-cover"
      style="height: 50%; width: 50%"
    />
    <FooterComponent />
  </div>
</template>

<style scoped></style>
