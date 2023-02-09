import { Activity, DEFAULT_ACTIVITY_LIST } from '@/types/IActivity'


export const useActivity = () => {
  const config = useRuntimeConfig();
  const { allUsers, getAllUsers } = useUser()
  const { getDatabase, updatePage } = useNotion()
  const { activities, user } = useStore()

  const loading = ref(false)

  const getActivities = async (databaseId: string): Promise<void> => {

    const response = await getDatabase(databaseId);

    activities.value = await formatActivities(response.results)
  };

  const formatActivities = async (data: any): Promise<Activity[]> => {
    const activities: Activity[] = []
    await getAllUsers(config.public.usersDatabase)
    for await (const el of data) {

      const users: any = []
      for (const item of el.properties.User.relation) {
        // await getUser(config.public.usersDatabase, item.id);
        const userData = allUsers.value.find((ele) => ele.id === item.id)
        users.push({ id: userData?.id, name: userData?.name });
      }

      activities.push({
        id: el.id,
        name: el.properties.Nom.title[0].text.content,
        day: el.properties.Jour.select.name,
        price: el.properties.Prix.number,
        image: el.properties.Image.files[0] !== undefined ? el.properties.Image.files[0].file.url : null,
        description: el.properties.Description.rich_text[0].text.content,
        userRelation: users
      })
    };

    return activities
  }

  const updateUserActivities = async (activityId: string, userId: string, userActivities: any): Promise<void> => {

    const result = userActivities.some((el: any) => el.id === activityId);

    if (result) {
      const index = userActivities.findIndex((el: any) => el.id === activityId);
      userActivities.splice(index, 1);
    } else {
      userActivities.push({ id: activityId });
    }

    // update activities store
    user.value.activities = userActivities;

    // const index = activities.value.findIndex((el) => el.id === activityId)

    // const relation = activities.value[index].userRelation
    // const indexRelation = relation?.findIndex((el) => el.id === userId)


    // if (indexRelation !== (-1)) {
    //   activities.value[index].userRelation?.splice(indexRelation!, 1)
    // } else {
    //   activities.value[index].userRelation?.push({ id: activityId, name: user.value.name })
    // }

    // upadte notion
    await updatePage(userId, {
      Activités: {
        relation: userActivities,
      },
    });

    await getActivities(config.public.activitiesDatabase);

  }


  return { activities, getActivities, updateUserActivities, loading }
}


