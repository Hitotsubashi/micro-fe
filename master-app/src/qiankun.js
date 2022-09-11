import { initGlobalState, addErrorHandler } from 'qiankun'
import store from './store'
import router from './router'
import { createStore } from 'redux'

const actions = initGlobalState(store.getters.microAppState)

addErrorHandler((error) => {
  store.dispatch('microApp/changeError', true)
  console.error(error)
})

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

export default actions
