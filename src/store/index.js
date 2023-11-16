import { createStore } from 'vuex';

const store = createStore({
  state() {
    const savedState = JSON.parse(localStorage.getItem('vuex_state')) || {
      isAuthenticated: false,
      token: '',
      expiration: null,
    };

    return savedState;
  },
  mutations: {
    setSession(state, { isAuthenticated, token, expiration }) {
      state.isAuthenticated = isAuthenticated;
      state.token = token;
      state.expiration = expiration;

      localStorage.setItem('vuex_state', JSON.stringify(state));
    },
    clearSession(state) {
      state.isAuthenticated = false;
      state.token = '';
      state.expiration = null;

      localStorage.setItem('vuex_state', JSON.stringify(state));
    },
  },
});

export default store;