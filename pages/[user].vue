<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const userId = useRoute().path.replace("/", "");
const config = useRuntimeConfig();

const loading = ref(false);
const { user, getUser, updateUserStatus } = useUser();

await getUser(config.public.usersDatabase, userId);

const handleUpdate = async () => {
  loading.value = true;
  await updateUserStatus(user.value.id);
  loading.value = false;
};
</script>
<template>
  <div class="w-10/12 mx-auto my-0">
    <div
      class="flex flex-row justify-between items-center bg-gradient-to-b from-[#12191F] to-transparent w-full sticky top-0 z-10 p-5"
    >
      <h1 class="p-0 m-0">Bonjour {{ user.name }}</h1>
      <UITotal />
    </div>
    <Suspense>
      <template #fallback>
        <div class="flex justify-center items-start gap-5 flex-wrap">
          <ActivityCardPlaceholder />
          <ActivityCardPlaceholder />
          <ActivityCardPlaceholder />
        </div>
      </template>
      <template #default>
        <ActivityList />
      </template>
    </Suspense>

    <UIButton class="sticky bottom-0" :loading="loading" @click="handleUpdate"
      >Valider ma sélection</UIButton
    >
  </div>
</template>
