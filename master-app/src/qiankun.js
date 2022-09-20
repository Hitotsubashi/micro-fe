import store from './store'
import router from './router'

export const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}

export const sharedDispatcher = {
  reducer(action) {
    switch (action.type) {
      case 'CHANGE_ROUTE':
        router.push(action.payload)
        break
      case 'UPDATE_ROUTES':
        store.dispatch('microApp/updateRoutes', action.payload)
        break
      default:
        break
    }
  },

  dispatch(action) {
    this.reducer(action)
  }
}
