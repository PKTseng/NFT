<template>
  <div class="max-w-xl mx-auto">
    <h2 class="text-xl font-bold">🔍 查詢 NFT（依照錢包地址）</h2>

    <div class="flex items-center gap-2">
      <v-text-field
        v-model="ownerAddress"
        type="text"
        density="compact"
        placeholder="輸入錢包地址（ownerAddress）"
        class="w-full px-2 py-2"
        hide-details
        variant="outlined"
        clearable
      >
      </v-text-field>

      <v-btn color="primary" @click="searchText">查詢</v-btn>
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
