<script setup lang="ts">
import { Activity } from "@/types/IActivity";
const props = defineProps<{
  activity: Activity;
  loading: boolean;
}>();

const { user } = useUser();
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

      <div class="flex flex-col gap-2">
        <div class="text-sm">Participant.es:</div>
        <ul class="inline-flex gap-2 p-0 m-0">
          <li
            v-if="props.activity.userRelation![0] === undefined"
            class="list-none"
          >
            <span class="text-xs text-dark bg-gray p-1 rounded-sm"
              >Aucun.es participant.es</span
            >
          </li>
          <li class="list-none" v-for="user in props.activity.userRelation">
            <span class="text-xs text-dark bg-teal p-1 rounded-sm">{{
              user.name
            }}</span>
          </li>
        </ul>
      </div>

      <UIButton
        @click="$emit('update', activity.id)"
        class="outline"
        :class="activityStatus === 'Ajouter' ? '' : 'secondary'"
        :loading="loading"
      >
        {{ activityStatus }}
      </UIButton>
    </footer>
  </article>
</template>
