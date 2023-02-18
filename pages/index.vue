<script setup lang="ts">
const id = ref("");
const error = ref("");
const { checkId } = useAuth();
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  const isValid = id.value.match(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );

  error.value = "";

  if (!isValid) {
    error.value = "Le format de l'identifiant est invalide";
    loading.value = false;
    return;
  }

  const isIdValid = await checkId(id.value);

  if (!isIdValid) {
    error.value = "L'utilisateur n'existe pas";
    loading.value = false;
    return;
  }
  loading.value = false;
  navigateTo(`/${id.value}`);
};
</script>

<template>
  <div class="container">
    <h2>Bienvenue</h2>
    <form @submit.prevent="handleSubmit">
      <label for="id">
        Identifiant
        <input type="text" name="id" placeholder="Votre identifiant" v-model="id" />
      </label>
      <UIButton type="submit" :loading="loading">Se connecter</UIButton>
      <small v-if="error">{{ error }}</small>
    </form>
  </div>
</template>
