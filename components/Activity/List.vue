<script setup lang="ts">
const { user, loading } = useUser();

const { activities, getActivities, updateUserActivities } = useActivity();

const config = useRuntimeConfig();

await getActivities(config.public.activitiesDatabase);

const currentActivity = ref();

const handleActivityClick = async (activityId: string) => {
  currentActivity.value = activityId;
  loading.value = true;
  const userActivities = user.value.activities?.slice();
  await updateUserActivities(activityId, user.value.id, userActivities);
  loading.value = false;
};
</script>
<template>
  <div>
    <ActivityCard
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      @update="handleActivityClick"
      :loading="activity.id === currentActivity ? loading : false"
    />
  </div>
</template>
