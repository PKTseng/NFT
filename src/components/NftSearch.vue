<template>
  <div class="max-w-xl mx-auto">
    <h2 class="text-xl font-bold">🔍 查詢 NFT（依照錢包地址）</h2>

    <div class="flex items-center gap-2">
      <v-text-field
        v-model="ownerAddress"
        type="text"
        density="compact"
        placeholder="輸入錢包地址（ownerAddress）"
        class="w-full px-4 py-2 border rounded"
        hide-details
        variant="outlined"
      />
      <v-btn class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" @click="searchText">查詢</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ownerAddress = ref('')

const emit = defineEmits(['handleSearch'])

const searchText = () => {
  emit('handleSearch', ownerAddress.value)
}
</script>
