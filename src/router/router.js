import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

/* middleware */
import auth from './middleware/auth'
import company from './middleware/company'
/* middleware end */

import Login from '@/pages/Auth/Login/Login'
import Registration from '@/pages/Auth/Registration/Registration'

import CompanyCreate from '@/pages/Auth/CreateCompany/Create'

import Home from '@/pages/Home/Home'
import Calendar from '@/pages/Calendar/Calendar'

import CompanyEmployee from '@/pages/Company/Employee/Employee'
import CompanyProcedures from '@/pages/Company/Procedures/Procedures'

Vue.use(Router)

function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

const router = new Router({
  mode: 'history',

  scrollBehavior,

  routes: [
    { path: '/', name: 'home', component: Home, meta: { middleware: [auth, company] } },

    { path: '/login/', name: 'login', component: Login },
    { path: '/registration/', name: 'registration', component: Registration },

    { path: '/company/create/', name: 'companyCreate', component: CompanyCreate, meta: { middleware: [auth] } },

    { path: '/calendar/', name: 'calendar', component: Calendar, meta: { middleware: [auth, company] } },

    { path: '/company/employee/', name: 'companyEmployee', component: CompanyEmployee, meta: { middleware: [auth, company] } },
    { path: '/company/procedures/', name: 'CompanyProcedures', component: CompanyProcedures, meta: { middleware: [auth, company] } }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  for (const middleware of to.meta.middleware) {
    const result = await middleware({
      to,
      from,
      next,
      store
    })

    if (result) {
      return
    }
  }

  return next()
})

export default router
