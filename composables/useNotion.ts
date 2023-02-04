import { User } from '@/types/IUser'
import { Activity } from '@/types/IActivity'


export const useNotion = () => {
  const config = useRuntimeConfig();
  const loading = ref(false)

  const getDatabase = async (databaseId: string): Promise<any> => {
    const { data, error } = await useFetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Authorization": `Bearer ${config.notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
    })

    if (error.value) {
      console.log(error.value)
      throw error.value
    }
    return data.value
  };

  const getPage = async (pageId: string): Promise<any> => {
    const { data, error } = await useFetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: "GET",
      mode: 'no-cors',
      headers: {
        "Authorization": `Bearer ${config.notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
    })

    if (error.value) {
      console.log(error.value)
      throw error.value
    }
    // const response = await notion.databases.query({ database_id: databaseId, page_size: 100 });
    return data.value
  };

  const updatePage = async (pageId: string, properties: any): Promise<any> => {
    const { data, error } = await useFetch('/api/update', {
      method: 'POST',
      body: {
        pageId,
        properties
      }
    })

    if (error.value) {
      console.log(error.value)
      throw error.value
    }
    // const response = await notion.databases.query({ database_id: databaseId, page_size: 100 });
    return data.value
  };


  const getUser = async (databaseId: string, userId: string) => {
    const response = await getDatabase(databaseId);

    const result = response.results.find((el: any) => el.id === userId)

    if (result === undefined) {
      throw Error('Aucun participant pour ce lien !')
    }

    const user = formatUser(result)
    return user
  };


  const formatUser = (data: any): User => {
    const user: User = {
      id: data.id,
      name: data.properties.Nom.title[0].text.content,
      email: data.properties.email.email,
      total: data.properties["Prix Total"] === null ? data.properties["Prix Total"].number : null,
      activities: data.properties["Activités"].relation
    }
    return user
  }

  const getActivities = async (databaseId: string) => {
    const response = await getDatabase(databaseId);
    const activities = formatActivities(response.results)
    return activities
  };

  const formatActivities = (data: any): Activity[] => {
    const activities: Activity[] = []
    data.forEach((el: any) => {
      activities.push({
        id: el.id,
        name: el.properties.Nom.title[0].text.content,
        day: el.properties.Jour.select.name,
        price: el.properties.Prix.number,
        image: el.properties.Image.files[0] !== undefined ? el.properties.Image.files[0].file.url : null,
        description: el.properties.Description.rich_text[0].text.content
      })
    });
    return activities
  }

  return { getUser, getActivities, updatePage }
}
