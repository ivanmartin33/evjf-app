<script setup lang="ts">
const config = useRuntimeConfig();
const user = ref();

const activities = await useNotion().getActivities(config.activitiesDatabase);
user.value = await useNotion().getUser(
  config.public.usersDatabase,
  "09c788f5-4f4a-4d24-93f8-c405d421dc86"
);

const handleUpdate = async () => {
  await useNotion().updatePage(user.value.id, {
    "Lien unique": {
      url: "http://localhost:3000/09c788f5-4f4a-4d24-93f8-c405d421dc86",
    },
  });
};

const handleActivityClick = async (activityId?: string) => {
  const userActivities = user.value.activities.slice();
  const result = userActivities.some((el: any) => el.id === activityId);

  if (result) {
    const index = userActivities.findIndex((el: any) => el.id === activityId);
    userActivities.splice(index, 1);
  } else {
    userActivities.push({ id: activityId });
  }

  await useNotion().updatePage(user.value.id, {
    Activités: {
      relation: userActivities,
    },
  });

  user.value.activities = userActivities;
};
</script>

<template>
  <div class="container">
    <button @click="handleUpdate">Update</button>

    <ActivityCard
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      @update="handleActivityClick"
    />
  </div>
</template>
