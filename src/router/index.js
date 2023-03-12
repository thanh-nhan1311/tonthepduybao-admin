import { createRouter, createWebHistory } from 'vue-router'
import { LOGIN_URL } from '../modules/http'
import routes from '../modules/routes'
import { useAuthStore } from '~/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (authStore.isAuth) {
    if (to.path === LOGIN_URL) next({ path: '/' })
    else next()
  } else {
    if (to.path !== LOGIN_URL) next({ path: LOGIN_URL })
    else next()
  }
})
export default router
