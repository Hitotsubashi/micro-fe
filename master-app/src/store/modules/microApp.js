const state = {
  loading: false,
  error: false,
  routes: []
}

const mutations = {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
  SET_ERROR: (state, error) => {
    state.error = error
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  changeLoading({ commit }, loading) {
    commit('SET_ERROR', false)
    commit('SET_LOADING', loading)
  },
  changeError({ commit }, error) {
    commit('SET_LOADING', false)
    commit('SET_ERROR', error)
  },
  updateRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
