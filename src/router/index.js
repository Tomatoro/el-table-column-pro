import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableTest from '@/components/TableTest'
import parent from '@/components/parent'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'child',
    //   component: child
    // },
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/t',
			name: 'table',
			component: TableTest
		}
  ]
})
