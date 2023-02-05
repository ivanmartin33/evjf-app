export default defineNuxtRouteMiddleware(async (to, from) => {

  const { checkId } = useAuth()

  const userId = to.path.replace('/', '')
  const isValidId = await checkId(userId)
  if (!isValidId) { return navigateTo('/') }

})