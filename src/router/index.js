import Vue from 'vue'
import VueRouter from 'vue-router'

//前台
import CommonLayout from '../components/commonLayout'
import Home from '../pages/home'
import Archives from '../pages/archives'
import Categories from '../pages/categories'
import Collections from '../pages/collections'
import Demo from '../pages/demo'
import About from '../pages/about'
import Detail from '../pages/detail'

//后台
import Signin from '../pages/admin/signin'
import ArticleList from '../pages/admin/articleList'
import ArticleEdit from '../pages/admin/articleEdit'
import DemoEdit from '../pages/admin/demoEdit'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: CommonLayout,
    // name:'layout',
    children:[
      {
        path: '',
        component: Home,
        name:'home'
      },
      {
        path: '/archives',
        component: Archives,
        name:'archives',
      },
      {
        path: '/detail/:id',
        component: Detail,
      },
      {
        path: '/categories',
        component: Categories,
        name:'categories'
      },
      {
        path: '/collections',
        component: Collections,
        name:'collections'
      },
      {
        path: '/demo',
        component: Demo,
        name:'demo'
      },
      {
        path: '/about',
        component: About,
        name:'about'
      },
    ]
  },
  {
    path: '/admin/sign',
    alias: '/admin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/admin/list',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/admin/edit',
    name: 'ArticleEdit',
    component: ArticleEdit
  },
  {
    path: '/admin/edit/:id', 
    name: 'ArticleUpdate',
    component: ArticleEdit
  },
  {
    path: '/admin/editt',
    name: 'DemoEdit',
    component: DemoEdit
  },
  {
    path: '/admin/editt/:id', 
    name: 'DemoUpdate',
    component: DemoEdit
  }
]
export default new VueRouter({
  // mode: 'history',
  routes
})
