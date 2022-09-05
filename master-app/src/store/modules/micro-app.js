const state = {
  loading: false,
  error: false,
}

const mutations = {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
  SET_ERROR: (state, error) => {
    state.error = error
  }
}

const actions = {
  changeLoading({ commit }, loading) {
    commit('SET_LOADING', loading)
  },
  changeError({commit}, error){
    commit('SET_ERROR', error)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
