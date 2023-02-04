<script setup lang="ts">
const userId = useRoute().path.replace("/", "");
const config = useRuntimeConfig();
const user = ref();

const activities = await useNotion().getActivities(config.activitiesDatabase);

try {
  user.value = await useNotion().getUser(config.public.usersDatabase, userId);
} catch (e) {
  navigateTo("/");
}
</script>
<template>
  <div>
    {{ user.name }}
  </div>
  <ActivityCard
    v-for="activity in activities"
    :key="activity.id"
    :activity="activity"
  />
</template>
