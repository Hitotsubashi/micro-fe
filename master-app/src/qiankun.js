import store from './store'

export const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}
