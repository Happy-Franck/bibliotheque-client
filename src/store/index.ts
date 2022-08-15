import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState()
  ],
  state: {
    user: {},
    role: '',
    commande: []
  },
  getters: {
    getUser(state){
      return state.user;
    },
    getRole(state){
      return state.role;
    },
    getCommande(state){
      return state.role;
    }
  },
  mutations: {
    setUserMutation(state , user){
      state.user = user
    },
    setRoleMutation(state , role){
      state.role = role
    },
    setCommandeMutation(state, commande){
      state.commande = commande
    }
  },
  actions: {
    setUser({commit} , user){
      commit('setUserMutation' , user)
    },
    setRole({commit} , role){
      commit('setRoleMutation' , role)
    },
    setCommande({commit} , commande){
      commit('setCommandeMutation', commande)
    }
  },
  modules: {
  }
})
