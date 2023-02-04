<script setup lang="ts">
const props = defineProps<{
  activity: any;
}>();

defineEmits(["update"]);
</script>
<template>
  <article>
    <header>{{ activity.name }}</header>
    <div>
      {{ activity.description }}
    </div>
    <img :src="activity.image" />
    <footer>
      {{ activity.price }}
      <a href="#" role="button" @click="$emit('update', activity.id)"
        >Retirer</a
      >
    </footer>
  </article>
</template>
