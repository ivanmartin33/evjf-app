<script setup lang="ts">
import { useUserStore, useActivityStore } from "@/stores/globalStore";
const { user } = storeToRefs(useUserStore());
const { total, activities } = storeToRefs(useActivityStore());

const getTotal = computed(() => {
  let totalUser = 0;
  activities.value?.forEach((el) => {
    const result = el.userRelation?.some((re) => re.id === user.value.id);
    if (result) {
      totalUser += el.price!;
    }
  });
  total.value = totalUser;
  return totalUser;
});
</script>
<template>
  <div class="bg-light md:text-xl p-2 rounded-sm w-fit h-fit text-dark">
    Ton total : <span class="font-bold">{{ getTotal }}€</span>
  </div>
</template>
