import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import candidate from './modules/candidate'

Vue.use(Vuex)

interface IState {
  chain: string
  engines: number
  weapons: number
  showDrawer: boolean
}

const store = new Vuex.Store({
  state: {
    showDrawer: false,
    chain: 'kusama',
    engines: 50,
    weapons: 50
  },
  mutations: {
    SET_DRAWER_VISIBLE(state: IState, visible: boolean) {
      console.log('SET_DRAWER_VISIBLE', visible)
      state.showDrawer = visible
    },
  },
  actions: {
    setDrawerVisible ({ commit }, visible) {
      commit('SET_DRAWER_VISIBLE', visible)
    }
  },
  modules: {
    candidate
  }
})

// module.exports = { store }
export { store }
