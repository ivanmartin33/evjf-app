<script setup lang="ts">
import { useUserStore, useActivityStore } from "~~/stores/globalStore";
import { Activity } from "@/types/IActivity";

const props = withDefaults(
  defineProps<{
    activity: Activity;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    loading: false,
    disabled: false,
  }
);

const { getActivityParticipants } = useActivityStore();
const { user } = storeToRefs(useUserStore());
defineEmits(["update"]);

const activityStatus = computed(() => {
  const result = props.activity.userRelation?.find(
    (el) => el.id === user.value.id
  );

  if (result === undefined) {
    return "Ajouter";
  }

  return "Retirer";
});
</script>
<template>
  <article
    class="w-full lg:w-xs border-solid border-1 border-gray-700 z-0 scale-100 hover:scale-102 hover:shadow-lg hover:shadow-opacity-50 duration-200"
  >
    <header class="overflow-hidden relative h-30">
      <div class="z-2 relative">
        <h2>{{ activity.name }}</h2>
      </div>
      <div
        class="mx-auto absolute top-0 left-0 w-full h-full before:content-none before:w-full before:h-full before:absolute before:bg-gradient-to-b before:from-[#12191f] before:to-transparent before:bg-opacity-100 before:top-0 before:left-0 before:block"
      >
        <img
          v-if="activity.image"
          :src="activity.image"
          class="w-full h-full object-center object-cover"
        />
      </div>
    </header>

    <div>
      {{ activity.description }}
    </div>

    <footer class="flex flex-col gap-5">
      <div class="text-sm text-dark p-1 rounded-sm bg-light-700 w-fit self-end">
        <span class="font-bold">{{ activity.price }}€</span>
      </div>
      <ClientOnly>
        <ActivityParticipants
          :participants="getActivityParticipants(props.activity.id)"
        />
      </ClientOnly>

      <UIButton
        @click="$emit('update', activity.id)"
        class="outline"
        :class="activityStatus === 'Ajouter' ? '' : 'secondary'"
        :loading="loading"
        :disabled="disabled"
      >
        {{ activityStatus }}
      </UIButton>
    </footer>
  </article>
</template>
