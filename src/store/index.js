import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeIndex: '1'//导航选中
    },
    mutations: {
      changeIndex(state,n) {
        state.activeIndex = n
      }
    }
  })