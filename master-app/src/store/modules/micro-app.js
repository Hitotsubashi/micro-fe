const state = {
  loading: false,
  error: false,
  breadcrumbs: []
}

const mutations = {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
  SET_ERROR: (state, error) => {
    state.error = error
  },
  SET_BREADCRUMBS: (state, breadcrumbs) => {
    state.breadcrumbs = breadcrumbs
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
  updateBreadcrumbs({ commit }, breadcrumbs) {
    commit('SET_BREADCRUMBS', breadcrumbs)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
