<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentSlide = ref(0)
const slides = [
  {
    img: '/img/banner2.png',
  },
  {
    img: '/img/banner3.png',
  },
  {
    img: '/img/banner4.png',
  },
]

onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})
</script>

<template>
  <div class="w-full overflow-hidden relative" id="slider">
    <!-- Container de Slides -->
    <div
      class="flex transition-transform duration-1000 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="w-full h-[80vh] flex-shrink-0">
        <img
          :src="slide.img"
          :class="{
            'w-full': true,
            'h-full': true,
            'object-cover': true,
            'transition-opacity': true,
          }"
          alt="slide"
        />
      </div>
    </div>
  </div>
</template>
