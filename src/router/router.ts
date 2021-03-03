import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import widgetsRoutes from '@/widgets/routes'

/* middleware */
import auth from './middleware/auth'
import company from './middleware/company'
import roleRedirect from './middleware/role-redirect'
/* middleware end */

const dynamicPage = (importer) => () => {
  return importer().then((mod) => mod.default || mod)
}

const Login = dynamicPage(() => import('@/pages/Auth/Login/Login.vue'))
const Restore = dynamicPage(() => import('@/pages/Auth/Restore/Restore.vue'))
const Registration = dynamicPage(() => import('@/pages/Auth/Registration/Registration.vue'))
const CompanyCreate = dynamicPage(() => import('@/pages/Auth/CompanyCreate/CompanyCreate.vue'))

const DashboardPage = dynamicPage(() => import('@/pages/DashboardPage/DashboardPage.vue'))
const SchedulePage = dynamicPage(() => import('@/pages/SchedulePage/SchedulePage.vue'))
const SpecialistsPage = dynamicPage(() => import('@/pages/SpecialistsPage/SpecialistsPage.vue'))
const Procedures = dynamicPage(() => import('@/pages/Procedures/Procedures.vue'))
const TimeOff = dynamicPage(() => import('@/pages/TimeOff/TimeOff.vue'))

const SpecialistPage = dynamicPage(() => import('@/pages/SpecialistPage/SpecialistPage.vue'))
const SpecialistInfoPage = dynamicPage(() => import('@/pages/SpecialistPage/SpecialistInfoPage/SpecialistInfoPage.vue'))
const SpecialistAppointmentsPage = dynamicPage(() => import('@/pages/SpecialistPage/SpecialistAppointmentsPage/SpecialistAppointmentsPage.vue'))

const SmsSettingsPage = dynamicPage(() => import('@/pages/SettingsPage/SmsSettingsPage/SmsSettingsPage.vue'))
const WidgetSettingsPage = dynamicPage(() => import('@/pages/SettingsPage/WidgetSettingsPage/WidgetSettingsPage.vue'))
const CompanySettingsPage = dynamicPage(() => import('@/pages/SettingsPage/CompanySettingsPage/CompanySettingsPage.vue'))

const AnalyticsAppointmentsPage = dynamicPage(() => import('@/pages/AnalyticsPage/Appointments/Appointments.vue'))
const AnalyticsFinancePage = dynamicPage(() => import('@/pages/AnalyticsPage/Finance/Finance.vue'))

const Error = dynamicPage(() => import('@/pages/Error/404.vue'))

Vue.use(Router)

function scrollBehavior (_to, _from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

const specialistPages = [
  {
    meta: { middleware: [auth, company, roleRedirect] },
    path: 'info',
    name: 'specialistInfo',
    component: SpecialistInfoPage
  },

  {
    meta: { middleware: [auth, company, roleRedirect] },
    path: 'appointments',
    name: 'specialistAppointments',
    component: SpecialistAppointmentsPage
  }
]

const router = new Router({
  mode: 'history',

  scrollBehavior,

  routes: [
    { path: '/', redirect: '/dashboard' },

    { path: '/dashboard', name: 'dashboard', component: DashboardPage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },

    { path: '/login/', name: 'login', component: Login },
    { path: '/restore/', name: 'restore', component: Restore },
    { path: '/registration/', name: 'registration', component: Registration },
    { path: '/company/create/', name: 'companyCreate', component: CompanyCreate, meta: { middleware: [auth] } },

    { path: '/schedule/', name: 'schedule', component: SchedulePage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },
    { path: '/time-off/', name: 'timeOff', component: TimeOff, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },
    { path: '/procedures/', name: 'procedures', component: Procedures, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },
    { path: '/specialists/', name: 'specialists', component: SpecialistsPage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },

    { path: '/specialist/:specialistId', name: 'specialist', component: SpecialistPage, children: specialistPages },

    { path: '/settings/', name: 'settings', redirect: '/settings/company/' },
    { path: '/settings/sms/', name: 'smsSettings', component: SmsSettingsPage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },
    { path: '/settings/widget/', name: 'widgetSettings', component: WidgetSettingsPage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },
    { path: '/settings/company/', name: 'companySettings', component: CompanySettingsPage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },

    { path: '/analytics/', name: 'analytics', redirect: '/analytics/appointments/' },
    { path: '/analytics/appointments/', name: 'analyticsAppointments', component: AnalyticsAppointmentsPage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },
    { path: '/analytics/finance/', name: 'analyticsFinance', component: AnalyticsFinancePage, meta: { layout: 'Dashboard', middleware: [auth, company, roleRedirect] } },

    ...widgetsRoutes,

    { path: '*', component: Error, meta: { layout: 'Base' } }
  ]
})

router.beforeEach(async (to, from, next) => {
  const context = { to, from, next, store }

  if (!to.meta.middleware) {
    return next()
  }

  for (const middleware of to.meta.middleware) {
    await middleware(context)
  }

  next()
})

export default router
