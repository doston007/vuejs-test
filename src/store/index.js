import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    set(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('set', { isLoading: true });

      try {
        const cachedData = JSON.parse(localStorage.getItem('rows'));
        let rowsData;
        if (Array.isArray(cachedData)) {
          commit('set', { isCached: true });
          rowsData = cachedData;
          console.log(rowsData, 'cache');
        } else {
          const { data } = await api.getPayments(params);
          rowsData = data;
          console.log(rowsData, 'no');
          localStorage.setItem('rows', JSON.stringify(data));
        }

        if (Array.isArray(rowsData)) {
          commit('set', { data: rowsData });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('set', { isLoading: false });
      }
    },
  },
});
