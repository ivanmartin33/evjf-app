export const useAuth = () => {
  const config = useRuntimeConfig()
  const { user, allUsers, getAllUsers } = useUser()

  const checkId = async (userId: string): Promise<boolean> => {

    if (allUsers.value.length === 0) {
      await getAllUsers(config.public.usersDatabase)
    }

    const valid = allUsers.value.find((user) => user.id === userId)

    user.value = valid!
    if (valid) return true
    else return false
  }

  const checkAdmin = async (userId: string): Promise<boolean> => {
    await getAllUsers(config.public.usersDatabase)

    const validUser = allUsers.value.find((u) => u.id === userId)

    if (!validUser?.isAdmin) return false
    return true
  }

  return { checkId, checkAdmin }
}