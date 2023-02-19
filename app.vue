<script setup lang="ts">
import "@picocss/pico/";
import "@unocss/reset/normalize.css";
import { useActivityStore, useUserStore } from "./stores/globalStore";
import { User } from "./types/IUser";

// // init app
// const { data: us, error: usError } = await useFetch("/api/users");
// const { data: ac, error: acError } = await useFetch("/api/activities");

// // init stores
// const { user, allUsers } = storeToRefs(useUserStore());
// const { activities } = storeToRefs(useActivityStore());

// allUsers.value = us.value as User[];
// activities.value = ac.value;
</script>

<template>
  <div class="mt-5">
    <NuxtPage />
  </div>
</template>

<style>
/* Pink Light scheme (Default) */
/* Can be forced with data-theme="light" */
[data-theme="light"],
:root:not([data-theme="dark"]) {
  --primary: #d81b60;
  --primary-hover: #c2185b;
  --primary-focus: rgba(216, 27, 96, 0.125);
  --primary-inverse: #fff;
}

/* Pink Dark scheme (Auto) */
/* Automatically enabled if user has Dark mode enabled */
@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --primary: #d81b60;
    --primary-hover: #e91e63;
    --primary-focus: rgba(216, 27, 96, 0.25);
    --primary-inverse: #fff;
  }
}

/* Pink Dark scheme (Forced) */
/* Enabled if forced with data-theme="dark" */
[data-theme="dark"] {
  --primary: #d81b60;
  --primary-hover: #e91e63;
  --primary-focus: rgba(216, 27, 96, 0.25);
  --primary-inverse: #fff;
}

/* Pink (Common styles) */
:root {
  --form-element-active-border-color: var(--primary);
  --form-element-focus-color: var(--primary-focus);
  --switch-color: var(--primary-inverse);
  --switch-checked-background-color: var(--primary);
}
</style>
