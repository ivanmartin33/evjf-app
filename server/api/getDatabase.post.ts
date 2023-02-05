export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const config = useRuntimeConfig()

  try {
    const res = await $fetch(`https://api.notion.com/v1/databases/${body.databaseId}/query`, {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Authorization": `Bearer ${config.notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
    })
    return res
  } catch (e: any) {
    sendError(event, e)
  }
})