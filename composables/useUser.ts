import { User, DEFAULT_USER } from '@/types/IUser'

export const useUser = () => {
  const config = useRuntimeConfig();
  const { getDatabase, updatePage } = useNotion()
  const { user, allUsers } = useStore()
  const loading = ref(false)


  const getUser = async (databaseId: string, userId: string): Promise<void> => {
    const res = await getDatabase(databaseId);

    const result = res.results.find((el: any) => el.id === userId)

    if (result === undefined) {
      throw Error('Aucun participant pour ce lien !')
    }
    user.value = formatUser(result)
  };

  const getAllUsers = async (databaseId: string): Promise<void> => {

    if (allUsers.value.length > 0) {
      return
    }
    const response = await getDatabase(databaseId);
    const users: any = [];
    response.results.forEach((user: any) => {
      users.push(formatUser(user))
    })
    allUsers.value = users
  };


  const formatUser = (data: any): User => {
    const user: User = {
      id: data.id,
      name: data.properties.Nom.title[0].text.content,
      email: data.properties.email.email,
      total: data.properties["Prix Total"] === null ? data.properties["Prix Total"].number : null,
      activities: data.properties["Activités"].relation,
      isAdmin: data.properties.isAdmin.checkbox,
      status: data.properties.Status.status.name
    }
    return user
  }

  const generateUsersLinks = async (databaseId: string): Promise<any> => {
    const users = await getAllUsers(databaseId)
    allUsers.value.forEach(async (user) => {
      await updatePage(user.id, {
        "Lien unique": {
          url: `http://localhost:3000/${user.id}`,
        },
      });
    })

  }

  const updateUserStatus = async (userId: string): Promise<void> => {

    let status = "A validé"

    if (user.value.status !== "Validé") {
      status = "Validé"
    }

    await updatePage(userId, {
      Status: {
        "status": {
          "name": status
        }
      },
    });
    await getUser(config.public.usersDatabase, userId)
  }


  return { user, allUsers, getUser, getAllUsers, generateUsersLinks, updateUserStatus, loading }
}
