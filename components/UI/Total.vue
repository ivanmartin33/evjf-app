<script setup lang="ts">
const { user, activities, total } = useStore();

const getTotal = computed(() => {
  let totalUser = 0;
  activities.value.forEach((el) => {
    const result = el.userRelation?.some((re) => re.id === user.value.id);
    if (result) {
      totalUser += el.price;
    }
  });
  total.value = totalUser;
  return totalUser;
});
</script>
<template>
  <div>{{ getTotal }} €</div>
</template>
