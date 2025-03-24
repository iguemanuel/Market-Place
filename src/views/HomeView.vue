<script setup lang="ts">
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import NavbarComponent from '@/components/Header/NavbarComponent.vue'
import CarouselComponent from '@/components/Main/CarouselComponent.vue'

const products = [
  {
    id: 1,
    name: 'Produto 1',
    price: 29.99,
    image: '/src/assets/img/banner-black-friday.png',
    category: 'Categoria 1',
  },
  {
    id: 3,
    name: 'Produto 2',
    price: 19.99,
    image: '/src/assets/img/banner2.png',
    category: 'Categoria 3',
  },
  {
    id: 4,
    name: 'Produto 3',
    price: 39.99,
    image: '/src/assets/img/banner3.png',
    category: 'Categoria 4',
  },
]
</script>

<template>
  <div class="w-full">
    <NavbarComponent />
    <CarouselComponent :products="products" />

    <FooterComponent />
  </div>
</template>
