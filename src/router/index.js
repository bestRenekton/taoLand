import Vue from 'vue'
import VueRouter from 'vue-router'

//前台
// import CommonLayout from '@/components/commonLayout'
// import Home from '@/pages/home'
// import Archives from '@/pages/archives'
// import Categories from '@/pages/categories'
// import Collections from '@/pages/collections'
// import Demo from '@/pages/demo'
// import About from '@/pages/about'
// import Detail from '@/pages/detail'
const CommonLayout = r => require.ensure([], () => r(require('@/components/commonLayout')), 'chunkname1')
const Home = r => require.ensure([], () => r(require('@/pages/home')), 'chunkname1')
const Archives = r => require.ensure([], () => r(require('@/pages/archives')), 'chunkname1')
const Categories = r => require.ensure([], () => r(require('@/pages/categories')), 'chunkname1')
const Collections = r => require.ensure([], () => r(require('@/pages/collections')), 'chunkname1')
const Demo = r => require.ensure([], () => r(require('@/pages/demo')), 'chunkname1')
const About = r => require.ensure([], () => r(require('@/pages/about')), 'chunkname1')
const Detail = r => require.ensure([], () => r(require('@/pages/detail')), 'chunkname2')
const Signin = r => require.ensure([], () => r(require('@/pages/signin')), 'chunkname1')


//admin后台
// import Signin from '@/pages/admin/signin'
// import ArticleList from '@/pages/admin/articleList'
// import ArticleEdit from '@/pages/admin/articleEdit'
// import DemoEdit from '@/pages/admin/demoEdit'
const ArticleList = r => require.ensure([], () => r(require('@/pages/admin/articleList')), 'chunkname3')
const ArticleEdit = r => require.ensure([], () => r(require('@/pages/admin/articleEdit')), 'chunkname3')
const DemoEdit = r => require.ensure([], () => r(require('@/pages/admin/demoEdit')), 'chunkname3')
//visiter后台
const VisiterIndex = r => require.ensure([], () => r(require('@/pages/visiter/index')), 'chunkname3')

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
      {
        path: '/visiter',
        component: VisiterIndex,
        name:'visiter'
      },
    ]
  },
  {
    path: '/sign',
    component: Signin,
    name:'Signin',
    alias: '/admin',
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
