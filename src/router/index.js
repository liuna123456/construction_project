import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page from '@/views/Page'
import Yuxuan from '@/views/Yuxuan'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page',
      name: 'Page',
      component: Page
    },
    {
      path: '/yuxuan',
      name: 'Yuxuan',
      component: Yuxuan
    }
  ]
})
