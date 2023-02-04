<script lang="ts" setup>
import { Client } from "@notionhq/client";

const config = useRuntimeConfig();
const notion = new Client({ auth: config.notionApiKey });

(async () => {
  const databaseId = "320f54753392429280755f8049f6fc68";
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();
</script>

<template>
  <div>Home</div>
</template>
