import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState()
  ],
  state: {
    user: {},
    role: ''
  },
  getters: {
    getUser(state){
      return state.user;
    },
    getRole(state){
      return state.role;
    }
  },
  mutations: {
    setUserMutation(state , user){
      state.user = user
    },
    setRoleMutation(state , role){
      state.role = role
    }
  },
  actions: {
    setUser({commit} , user){
      commit('setUserMutation' , user)
    },
    setRole({commit} , role){
      commit('setRoleMutation' , role)
    }
  },
  modules: {
  }
})
