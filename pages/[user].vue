<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const userId = useRoute().path.replace("/", "");
const config = useRuntimeConfig();

const { user, getUser, updateUserStatus } = useUser();

await getUser(config.public.usersDatabase, userId);

const handleUpdate = async () => {
  await updateUserStatus(user.value.id);
};
</script>
<template>
  <div class="container">
    {{ user.name }}
    <button type="button" @click="handleUpdate">Update</button>
    <UITotal />
    <ActivityList />
  </div>
</template>
