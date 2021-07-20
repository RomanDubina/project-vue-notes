import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Notice from '@/components/Notice'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/notice',
      name: 'Create Notice',
      component: Notice
    },
    {
      path: '/notice/:id',
      name: 'Edit Notice',
      component: Notice
    }
  ]
})
