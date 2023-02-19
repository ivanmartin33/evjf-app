<script setup lang="ts">
import { useUserStore, useActivityStore } from "~~/stores/globalStore";
const { user } = useUserStore();
const { activities } = storeToRefs(useActivityStore());
const { updateUserActivities } = useActivity();

const loading = ref(false);
const currentActivity = ref();

const { data, error } = await useFetch("/api/activities", { method: "POST" });

activities.value = data.value;

const handleUpdate = async (activityId: string) => {
  loading.value = true;
  currentActivity.value = activityId;

  await updateUserActivities(activityId, user.id, user.activities!);
  loading.value = false;
};
</script>

<template>
  <div
    v-if="activities"
    class="flex justify-center items-start gap-5 flex-wrap"
  >
    <ActivityCard
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      @update="handleUpdate"
      :loading="activity.id === currentActivity ? loading : false"
      :disabled="loading"
    />
  </div>
</template>
