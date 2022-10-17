import store from '@/store'
import router from '@/router'
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export async function logout(redirect) {
  await store.dispatch('user/logout')
  router.push(`/login${redirect ? `?redirect=${redirect}` : ''}`)
}
