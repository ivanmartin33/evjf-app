<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
});
const config = useRuntimeConfig();
const { generateUsersLinks } = useUser();

const handleUpdate = async () => {
  await generateUsersLinks(config.public.usersDatabase);
};
</script>
<template>
  <div>
    Gestion

    <button @click="handleUpdate">Mettre à jour les liens uniques</button>
  </div>
</template>
