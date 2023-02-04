export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const config = useRuntimeConfig()

  try {
    const res = await $fetch(`https://api.notion.com/v1/pages/${body.pageId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${config.notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: {
        properties: body.properties
      }
    })
    return res
  } catch (e: any) {
    sendError(event, e)
  }
})