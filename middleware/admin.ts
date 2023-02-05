export default defineNuxtRouteMiddleware(async (to, from) => {

  const { checkAdmin } = useAuth()
  const isValidId = await checkAdmin(to.params.id as string)
  if (!isValidId) { return navigateTo('/') }

})