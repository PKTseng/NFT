<template>
  <v-overlay
    :model-value="globalStore.isPageLoading"
    persistent
    :content-props="{
      style: `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      `,
    }"
  >
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
  </v-overlay>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div class="suspense-loading">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'
const globalStore = useGlobalStore()
</script>

<style scoped></style>
