<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  {
    loading: false,
  }
);
</script>
<template>
  <button
    v-bind="$attrs"
    :aria-busy="loading"
    :disabled="loading"
    class="bg-gray-500 text-white font-bold py-2 px-4 rounded-sm cursor-pointer border-none"
    :class="loading ? 'cursor-not-allowed' : ''"
  >
    <slot />
  </button>
</template>
