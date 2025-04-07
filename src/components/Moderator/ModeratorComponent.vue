<script setup lang="ts">
import { Package, Tag } from 'lucide-vue-next'
</script>

<template>
  <div class="grid gap-6">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="rounded-xl shadow-sm bg-white">
        <div class="p-6">
          <div class="flex items-center gap-2 text-xl font-semibold">
            <Package class="h-5 w-5" />
            <p class="!font-bold">Products</p>
          </div>
          <p class="text-sm text-gray-500">Crie os produtos do Marktplace</p>
        </div>
        <div class="p-6">
          <p>Create, edit, and delete products in your marketplace.</p>
        </div>
        <div class="p-6">
          <RouterLink to="/admin/products">
            <button
              class="btn-primary cursor-pointer text-white bg-gray-700 px-3 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Manage Products
            </button>
          </RouterLink>
        </div>
      </div>

      <div class="rounded-xl shadow-sm bg-white">
        <div class="p-6">
          <div class="flex items-center gap-2 text-xl font-semibold">
            <Tag class="h-5 w-5" />
            Categories
          </div>
          <p class="text-sm text-muted-foreground">Manage product categories</p>
        </div>
        <div class="p-6">
          <p>Create and organize categories for your products.</p>
        </div>
        <div class="p-6">
          <RouterLink to="/admin/categories">
            <button
              class="btn-primary cursor-pointer text-white bg-gray-700 px-3 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Manage Categories
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
