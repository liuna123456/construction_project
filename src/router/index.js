import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page from '@/views/Page'
import Yuxuan from '@/views/Yuxuan'
import Item1 from '@/views/Item1'
import Item2 from '@/views/Item2'
import Item3 from '@/views/Item3'
import Item4 from '@/views/Item4'
import Option1 from '@/components/Yuxuan/Item1/Option1'
import Option2 from '@/components/Yuxuan/Item1/Option2'
import Option3 from '@/components/Yuxuan/Item1/Option3'
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
      component: Yuxuan,
      redirect: '/yuxuan/item1/option1',
      children: [
        {
          path: 'item1/option1',
          name: 'Option1',
          component: Option1
        },
        {
          path: 'item1/option2',
          name: 'Option2',
          component: Option2
        },
        {
          path: 'item1/option3',
          name: 'Option3',
          component: Option3
        }
      ]
    },
    {
      path: '/yuxuan/item1',
      name: 'Item1',
      component: Item1,
      redirect: '/yuxuan/item1'
    },
    {
      path: '/yuxuan/item2',
      name: 'Item2',
      component: Item2
    },
    {
      path: '/yuxuan/item3',
      name: 'Item3',
      component: Item3
    },
    {
      path: '/yuxuan/item4',
      name: 'Item4',
      component: Item4
    }
  ]
})

// children: [
//   {
//     path: 'option1',
//     name: 'Option1',
//     component: Option1
//   },
//   {
//     path: 'option2',
//     name: 'Option2',
//     component: Option2
//   },
//   {
//     path: 'option3',
//     name: 'Option3',
//     component: Option3
//   }
// ]
