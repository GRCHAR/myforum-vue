import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    token: null
  },
  mutations: {
    setUserId(state, userId){
      state.userId = userId;
    },
    setToken(state, token) {
      state.token = token
    }
  },
  getters:{
    getUserId(state){
      return state.userId;
    },
    getToken(state) {
      return state.token
    }
  },
  actions: {
  },
  modules: {
  }
})
