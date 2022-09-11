import store from './store'
import router from './router'
import { createStore } from 'redux'


function reducer(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_GLOBAL_STATE':
      actions.setGlobalState(action.payload)
      return state
    case 'CHANGE_ROUTE':
      router.push(action.payload)
      return state
    case 'UPDATE_BREADCRUMB':
      store.dispatch('microApp/updateBreadcrumbs', action.payload)
      return state
    default:
      break
  }
}

export const shared = createStore(reducer, {})

export const loader = (loading) => {
  store.dispatch('microApp/changeLoading', loading)
}

