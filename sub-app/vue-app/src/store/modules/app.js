const state = {
  theme: "#1890ff",
};

const mutations = {
  SET_THEME: (state, theme) => {
    state.theme = theme;
  },
};

const actions = {
  changeTheme({ commit }, theme) {
    commit("SET_THEME", theme);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
