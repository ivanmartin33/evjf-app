<script setup lang="ts">
import { Activity } from "@/types/IActivity";
const props = defineProps<{
  activity: Activity;
  loading: boolean;
}>();

defineEmits(["update"]);
</script>
<template>
  <article>
    <header>{{ activity.name }}</header>
    <div>
      {{ activity.description }}
    </div>
    <img
      v-if="activity.image"
      :src="activity.image"
      style="height: 132px; width: 132px"
    />
    <footer>
      {{ activity.price }}€
      <ul>
        <li v-for="user in props.activity.userRelation">
          {{ user.name }}
        </li>
      </ul>
      <button @click="$emit('update', activity.id)" v-if="!loading">
        Retirer
      </button>
    </footer>
  </article>
</template>
