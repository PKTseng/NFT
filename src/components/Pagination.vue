<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    :total-visible="visiblePages"
    circle
    class="flex justify-center mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl pa-4 space-x-1"
    @next="currentPage++"
    @prev="currentPage--"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VPagination } from 'vuetify/components'

const props = defineProps<{
  modelValue: number /** 當前頁碼 */
  totalPages: number /** 總頁數 */
  visiblePages?: number /** 同時顯示的頁碼數量 */
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// 計算雙向綁定頁碼
const currentPage = computed({
  get: () => props.modelValue,
  set: (val: number) => emits('update:modelValue', val),
})

// 預設顯示 5 個可見頁碼
const visiblePages = computed(() => props.visiblePages ?? 5)
</script>

<style scoped></style>
