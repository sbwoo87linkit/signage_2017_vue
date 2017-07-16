import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  customer: {}
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

const mutations = {
  increment (state) {
    state.count++;
  },
  decrement (state) {
    state.count--;
  },
  setCustomer (state, customer) {
    state.customer = customer;
  }
}

const actions = {
  setCustomer: ( {commit, customer }) => commit('setCustomer', customer),
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd: ({commit, state}) => {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync: ({ commit }) => {
    return new Promise((response, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
