import Vue from 'vue'
// import VueResource from 'vue-resource'
import axios from 'axios'
import router from './router/index'
import store from './store/index'
import '../static/js/animation.js'
import '../static/js/tween.js'
// import '../static/live2d/live2d_something.js'
// import '../static/live2d/live2d.js'
import '../static/css/normalize.css'
import '../static/css/public.css'
import '../static/css/font/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


// Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(mavonEditor)

new Vue({
  el: '#app',
  data () {
    return {
    }
  },
  router,
//   axios,
  store,
  // watch:{
  //   '$route'(to,from){
  //      console.log(to)
  //    }
  // }
})


