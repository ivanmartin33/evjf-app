export default defineNuxtRouteMiddleware(async (to, from) => {

  const { checkId } = useAuth()
  const { user } = useUser()
  const userId = to.path.replace('/', '')
  if (user.value.id === "") {
    const isValidId = await checkId(userId)
    if (!isValidId) { return navigateTo('/') }
  }

})