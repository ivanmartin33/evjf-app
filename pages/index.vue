<script setup lang="ts">
const id = ref("");
const error = ref("");
const { checkId } = useAuth();

const handleSubmit = async () => {
  const isValid = id.value.match(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );

  error.value = "";

  if (!isValid) {
    error.value = "Le format de l'identifiant est invalide";
    return;
  }

  const isIdValid = await checkId(id.value);

  if (!isIdValid) {
    error.value = "L'utilisateur n'existe pas";
    return;
  }

  navigateTo(`/${id.value}`);
};
</script>

<template>
  <div class="container">
    <h2>Bienvenue</h2>
    <form @submit.prevent="handleSubmit">
      <label for="id">Identifiant</label>
      <input
        type="text"
        name="id"
        placeholder="Votre identifiant"
        v-model="id"
      />
      <button type="submit">Se connecter</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>
