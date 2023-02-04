

export const useUser = () => {

  const { getDatabase } = useNotion()

  const getUser = async (databaseId: string) => {
    const response = await getDatabase(databaseId);
    const activities = formatUser(response.results)
    return activities
  };

  const formatUser = (data: any): User => {
    const user: User = {
      id: data.id,
      name: data.properties.Nom.title[0].text.content,
      email: data.properties.Email.title[0].text.content,
      total: data.properties.Total.number,
      status: data.properties.Image.files[0] !== undefined ? data.properties.Image.files[0].file.url : null,
      activities: 
    }
    return user
  }



  return { getUser }
}