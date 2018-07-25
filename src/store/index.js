import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndex: '1',//导航选中
    isSignIn: 0,//0未登录，1admin，2游客
  },
  mutations: {
    changeIndex(state, n) {
      state.activeIndex = n
    },
    changeIsSignIn(state, n) {
      state.isSignIn = n
    }
  }
})