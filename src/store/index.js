import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null
  },
  mutations: {
    setUserId(state, userId){
      state.userId = userId;
    }
  },
  getters:{
    getUserId(state){
      return state.userId;
    }
  },
  actions: {
  },
  modules: {
  }
})
