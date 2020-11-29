import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import widgetsRoutes from '@/widgets/routes'

/* middleware */
import auth from './middleware/auth'
import company from './middleware/company'
/* middleware end */

const dynamicPage = (importer) => () => {
  return importer().then((mod) => mod.default || mod)
}

const Login = dynamicPage(() => import('@/pages/Auth/Login/Login'))
const Restore = dynamicPage(() => import('@/pages/Auth/Restore/Restore'))
const Registration = dynamicPage(() => import('@/pages/Auth/Registration/Registration'))
const CompanyCreate = dynamicPage(() => import('@/pages/Auth/CompanyCreate/CompanyCreate'))

const CompanySettings = dynamicPage(() => import('@/pages/Company/Settings/Settings'))

const Dashboard = dynamicPage(() => import('@/pages/Dashboard/Dashboard'))
const Schedule = dynamicPage(() => import('@/pages/Schedule/Schedule'))
const TimeOff = dynamicPage(() => import('@/pages/TimeOff/TimeOff'))

const Procedures = dynamicPage(() => import('@/pages/Procedures/Procedures'))
const Specialists = dynamicPage(() => import('@/pages/Specialists/Specialists'))

const Error = dynamicPage(() => import('@/pages/Error/404'))

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
    { path: '/', redirect: '/dashboard' },

    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { layout: 'Dashboard', middleware: [auth, company] } },

    { path: '/login/', name: 'login', component: Login },
    { path: '/restore/', name: 'restore', component: Restore },
    { path: '/registration/', name: 'registration', component: Registration },
    { path: '/company/create/', name: 'companyCreate', component: CompanyCreate, meta: { middleware: [auth] } },

    { path: '/schedule/', name: 'schedule', component: Schedule, meta: { layout: 'Dashboard', sidebar: true, middleware: [auth, company] } },
    { path: '/time-off/', name: 'timeOff', component: TimeOff, meta: { layout: 'Dashboard', middleware: [auth, company] } },
    { path: '/procedures/', name: 'procedures', component: Procedures, meta: { layout: 'Dashboard', middleware: [auth, company] } },
    { path: '/specialists/', name: 'specialists', component: Specialists, meta: { layout: 'Dashboard', middleware: [auth, company] } },

    { path: '/company/settings/', name: 'companySettings', component: CompanySettings, meta: { layout: 'Dashboard', middleware: [auth, company] } },

    ...widgetsRoutes,

    { path: '*', component: Error, meta: { layout: 'Base' } }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  for (const middleware of to.meta.middleware) {
    await middleware({
      to,
      from,
      next,
      store
    })
  }

  next()
})

export default router
