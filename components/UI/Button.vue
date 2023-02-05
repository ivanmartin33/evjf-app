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
    :class="loading ? 'cursor-not-allowed' : ''"
  >
    <slot />
  </button>
</template>
