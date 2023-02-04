import { Activity } from '@/types/IActivity'

export const useActivities = () => {

  const { getDatabase } = useNotion()

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


  return { getActivities }
}