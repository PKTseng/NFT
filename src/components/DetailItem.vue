<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <dt class="text-gray-500 font-medium">{{ label }}:</dt>
    <dd class="mt-1 sm:mt-0 text-gray-900 flex items-center">
      <span :class="{ 'font-mono': isAddress }">{{ value }}</span>
      <button
        v-if="isAddress && copyValue"
        class="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        title="Copy address"
        @click="copyToClipboard(copyValue)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </dd>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  isAddress?: boolean
  copyValue?: string
}>()

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 可選：顯示一個短暫的 "Copied!" 提示
    alert('Address copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err)
    alert('Failed to copy address.')
  }
}
</script>
