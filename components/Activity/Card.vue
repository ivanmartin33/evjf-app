<script setup lang="ts">
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

const { user } = useUser();
defineEmits(["update"]);

const activityStatus = computed(() => {
  const result = props.activity.userRelation?.find((el) => el.id === user.value.id);

  if (result === undefined) {
    return "Ajouter";
  }

  return "Retirer";
});
</script>
<template>
  <article class="w-full lg:w-xs z-0 duration-200 rounded-md overflow-hidden">
    <header class="overflow-hidden relative h-30 p-5">
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

    <div class="p-10">
      {{ activity.description }}
    </div>

    <footer class="flex flex-col gap-5 p-10">
      <div class="text-sm text-dark p-1 rounded-sm bg-light-700 w-fit self-end">
        <span class="font-bold">{{ activity.price }}€</span>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm">Participant.es:</div>

        <TransitionGroup name="list" tag="ul" class="inline-flex gap-2 p-0 m-0">
          <li
            v-if="props.activity.userRelation![0] === undefined"
            class="list-none"
            key="noOne"
          >
            <span class="text-xs text-dark bg-gray p-1 rounded-sm"
              >Aucun.es participant.es</span
            >
          </li>
          <li
            class="list-none"
            v-for="userRe in props.activity.userRelation"
            :key="userRe.id"
            :class="userRe.id === user.id && loading ? 'opacity-50' : ''"
          >
            <span
              class="text-xs p-1 rounded-sm"
              :class="
                userRe.id === user.id ? 'bg-pink-600 text-white' : 'bg-teal text-dark'
              "
              >{{ userRe.name }}</span
            >
          </li>
        </TransitionGroup>
      </div>

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

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
