export const useAuth = () => {
  const config = useRuntimeConfig()
  const { user, getAllUsers } = useUser()

  const checkId = async (userId: string): Promise<boolean> => {
    const users = await getAllUsers(config.public.usersDatabase)
    const valid = users.find((user) => user.id === userId)

    if (valid) return true
    else return false
  }

  const checkAdmin = async (userId: string): Promise<boolean> => {
    const users = await getAllUsers(config.public.usersDatabase)
    const validUser = users.find((u) => u.id === userId)

    if (!validUser?.isAdmin) return false
    return true
  }

  return { checkId, checkAdmin }
}