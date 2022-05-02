import { RouteConfig } from 'vue-router/types'

import { lazyComponent } from '~/utils/lazy-component'

import widgetsRoutes from '~/widgets/routes'

const Login = lazyComponent(() => import('~/pages/Auth/Login/Login.vue'))
const Restore = lazyComponent(() => import('~/pages/Auth/Restore/Restore.vue'))
const Registration = lazyComponent(() => import('~/pages/Auth/Registration/Registration.vue'))
const Confirmation = lazyComponent(() => import('~/pages/Auth/Confirmation/Confirmation.vue'))
const CompanyCreate = lazyComponent(() => import('~/pages/Auth/CompanyCreate/CompanyCreate.vue'))

const DashboardPage = lazyComponent(() => import('~/pages/DashboardPage/DashboardPage.vue'))
const SchedulePage = lazyComponent(() => import('~/pages/SchedulePage/SchedulePage.vue'))
const SpecialistsPage = lazyComponent(() => import('~/pages/SpecialistsPage/SpecialistsPage.vue'))
const ProceduresPage = lazyComponent(() => import('~/pages/ProceduresPage/ProceduresPage.vue'))
const TimeOff = lazyComponent(() => import('~/pages/TimeOff/TimeOff.vue'))

const SpecialistInfoPage = lazyComponent(() => import('~/pages/SpecialistPage/InfoPage/InfoPage.vue'))
const SpecialistSchedulePage = lazyComponent(() => import('~/pages/SpecialistPage/SchedulePage/SchedulePage.vue'))
const SpecialistSettingsPage = lazyComponent(() => import('~/pages/SpecialistPage/SettingsPage/SettingsPage.vue'))
const SpecialistProceduresPage = lazyComponent(() => import('~/pages/SpecialistPage/ProceduresPage/ProceduresPage.vue'))

const SmsSettingsPage = lazyComponent(() => import('~/pages/SettingsPage/SmsSettingsPage/SmsSettingsPage.vue'))
const SmsHistoryPage = lazyComponent(() => import('~/pages/SettingsPage/SmsHistoryPage/SmsHistoryPage.vue'))
const WidgetSettingsPage = lazyComponent(() => import('~/pages/SettingsPage/WidgetSettingsPage/WidgetSettingsPage.vue'))
const CompanySettingsPage = lazyComponent(() => import('~/pages/SettingsPage/CompanySettingsPage/CompanySettingsPage.vue'))
const TimetableSettingsPage = lazyComponent(() => import('~/pages/SettingsPage/TimetableSettingsPage/TimetableSettingsPage.vue'))

const AnalyticsAppointmentsPage = lazyComponent(() => import('~/pages/AnalyticsPage/AppointmentsPage/AppointmentsPage.vue'))
const AnalyticsFinancePage = lazyComponent(() => import('~/pages/AnalyticsPage/FinancePage/FinancePage.vue'))

const ErrorPage = lazyComponent(() => import('~/pages/ErrorPage/ErrorPage.vue'))

const routes: RouteConfig[] = [
  // Widgets
  ...widgetsRoutes,

  { path: '/', name: 'dashboard', component: DashboardPage },

  { path: '/company/create/', name: 'companyCreate', component: CompanyCreate },

  { path: '/schedule/', name: 'schedule', component: SchedulePage },
  { path: '/time-off/', name: 'timeOff', component: TimeOff },
  { path: '/procedures/', name: 'procedures', component: ProceduresPage },
  { path: '/specialists/', name: 'specialists', component: SpecialistsPage },

  { path: '/specialist/:slug/info/', name: 'specialistInfo', component: SpecialistInfoPage },
  { path: '/specialist/:slug/schedule/', name: 'specialistSchedule', component: SpecialistSchedulePage },
  { path: '/specialist/:slug/settings/', name: 'specialistSettings', component: SpecialistSettingsPage },
  { path: '/specialist/:slug/procedures/', name: 'specialistProcedures', component: SpecialistProceduresPage },

  { path: '/settings/', name: 'settings', redirect: '/settings/company/' },
  { path: '/settings/sms/', name: 'smsSettings', component: SmsSettingsPage },
  { path: '/settings/sms/history/', name: 'smsHistory', component: SmsHistoryPage },
  { path: '/settings/widget/', name: 'widgetSettings', component: WidgetSettingsPage },
  { path: '/settings/company/', name: 'companySettings', component: CompanySettingsPage },
  { path: '/settings/timetable/', name: 'timetableSettings', component: TimetableSettingsPage },

  { path: '/analytics/', name: 'analytics', redirect: '/analytics/appointments/' },
  { path: '/analytics/appointments/', name: 'analyticsAppointments', component: AnalyticsAppointmentsPage },
  { path: '/analytics/finance/', name: 'analyticsFinance', component: AnalyticsFinancePage },

  { path: '/login/', name: 'login', component: Login, meta: { public: true } },
  { path: '/restore/', name: 'restore', component: Restore, meta: { public: true } },
  { path: '/registration/', name: 'registration', component: Registration, meta: { public: true } },
  { path: '/confirm/:slug', name: 'confirmation', component: Confirmation, meta: { public: true, slashRedirect: false } },

  { path: '*', name: 'error', component: ErrorPage, meta: { public: true } }
]

export default routes
