<script setup lang="ts">
import { useUserStore } from "~~/stores/globalStore";

const { user } = storeToRefs(useUserStore());

const props = withDefaults(
  defineProps<{
    participants: { id: string; name: string }[] | undefined;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="text-sm">Participant.es:</div>

    <div class="relative w-full">
      <TransitionGroup name="list" tag="ul" class="inline-flex gap-2 p-0 m-0">
        <li v-if="participants && participants.length <= 0" class="list-none" key="noOne">
          <span class="text-xs text-dark bg-gray p-1 rounded-sm"
            >Aucun.es participant.es</span
          >
        </li>
        <li
          class="list-none"
          v-for="userRe in participants"
          :key="userRe.id"
          :class="userRe.id === user.id && loading ? 'opacity-50' : ''"
        >
          <div
            class="text-xs p-1 rounded-sm"
            :class="
              userRe.id === user.id ? 'bg-pink-600 text-white' : 'bg-teal text-dark'
            "
          >
            {{ userRe.name }}
          </div>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  top: 0;
}
</style>
