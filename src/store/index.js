import { createStore } from 'vuex';

const store = createStore({
  state() {
    const savedState = JSON.parse(localStorage.getItem('vuex_state')) || {
      isAuthenticated: false,
      token: '',
      expiration: null,
      userData: null,
    };

    return savedState;
  },
  mutations: {
    setSession(state, { isAuthenticated, token, expiration, userData }) {
      state.isAuthenticated = isAuthenticated;
      state.token = token;
      state.expiration = expiration;
      state.userData = userData;

      localStorage.setItem('vuex_state', JSON.stringify(state));
    },
    clearSession(state) {
      state.isAuthenticated = false;
      state.token = '';
      state.expiration = null;
      state.userData = null;

      localStorage.setItem('vuex_state', JSON.stringify(state));
    },
    getSession(state) {
      const storedState = JSON.parse(localStorage.getItem('vuex_state')) || {};
      Object.keys(storedState).forEach(key => {
        state[key] = storedState[key];
      });
    }
  },
});

export default store;