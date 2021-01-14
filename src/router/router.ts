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

const Login = dynamicPage(() => import('@/pages/Auth/Login/Login.vue'))
const Restore = dynamicPage(() => import('@/pages/Auth/Restore/Restore.vue'))
const Registration = dynamicPage(() => import('@/pages/Auth/Registration/Registration.vue'))
const CompanyCreate = dynamicPage(() => import('@/pages/Auth/CompanyCreate/CompanyCreate.vue'))

const Dashboard = dynamicPage(() => import('@/pages/Dashboard/Dashboard.vue'))
const SchedulePage = dynamicPage(() => import('@/pages/SchedulePage/SchedulePage.vue'))
const Specialists = dynamicPage(() => import('@/pages/Specialists/Specialists.vue'))
const Procedures = dynamicPage(() => import('@/pages/Procedures/Procedures.vue'))
const TimeOff = dynamicPage(() => import('@/pages/TimeOff/TimeOff.vue'))

const SmsSettingsPage = dynamicPage(() => import('@/pages/SettingsPage/SmsSettingsPage/SmsSettingsPage.vue'))
const WidgetSettingsPage = dynamicPage(() => import('@/pages/SettingsPage/WidgetSettingsPage/WidgetSettingsPage.vue'))
const CompanySettingsPage = dynamicPage(() => import('@/pages/SettingsPage/CompanySettingsPage/CompanySettingsPage.vue'))

const Error = dynamicPage(() => import('@/pages/Error/404.vue'))

Vue.use(Router)

function scrollBehavior (_to, _from, savedPosition) {
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

    { path: '/schedule/', name: 'schedule', component: SchedulePage, meta: { layout: 'Dashboard', sidebar: true, middleware: [auth, company] } },
    { path: '/time-off/', name: 'timeOff', component: TimeOff, meta: { layout: 'Dashboard', middleware: [auth, company] } },
    { path: '/procedures/', name: 'procedures', component: Procedures, meta: { layout: 'Dashboard', middleware: [auth, company] } },
    { path: '/specialists/', name: 'specialists', component: Specialists, meta: { layout: 'Dashboard', middleware: [auth, company] } },

    { path: '/settings/', name: 'settings', redirect: '/settings/company/' },
    { path: '/settings/sms/', name: 'smsSettings', component: SmsSettingsPage, meta: { layout: 'Dashboard', middleware: [auth, company] } },
    { path: '/settings/widget/', name: 'widgetSettings', component: WidgetSettingsPage, meta: { layout: 'Dashboard', middleware: [auth, company] } },
    { path: '/settings/company/', name: 'companySettings', component: CompanySettingsPage, meta: { layout: 'Dashboard', middleware: [auth, company] } },

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
