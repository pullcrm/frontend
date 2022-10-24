import type { RouteRecordRaw } from 'vue-router'

import widgetRoutes from '~/widgets/routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/bootstrap.vue'),
        children: [
          {
            path: '',
            component: () => import('layouts/dashboard.vue'),
            children: [
              { path: '', name: 'dashboard', component: () => import('pages/DashboardPage/DashboardPage.vue') },
              { path: 'schedule/', name: 'schedule', component: () => import('pages/SchedulePage/SchedulePage.vue') },
              { path: 'time-off/', name: 'timeOff', component: () => import('pages/TimeOffPage/TimeOffPage.vue') },
              { path: 'procedures/', name: 'procedures', component: () => import('pages/ProceduresPage/ProceduresPage.vue') },
              { path: 'specialists/', name: 'specialists', component: () => import('pages/SpecialistsPage/SpecialistsPage.vue') },

              {
                path: 'settings/',
                component: () => import('pages/SettingsPage/layout.vue'),
                children: [
                  { path: '', name: 'settings', redirect: '/settings/company/' },
                  { path: 'sms/', name: 'smsSettings', component: () => import('pages/SettingsPage/SmsSettingsPage/SmsSettingsPage.vue') },
                  { path: 'sms/history/', name: 'smsHistory', component: () => import('pages/SettingsPage/SmsHistoryPage/SmsHistoryPage.vue') },
                  { path: 'widget/', name: 'widgetSettings', component: () => import('pages/SettingsPage/WidgetSettingsPage/WidgetSettingsPage.vue') },
                  { path: 'company/', name: 'companySettings', component: () => import('pages/SettingsPage/CompanySettingsPage/CompanySettingsPage.vue') },
                  { path: 'timetable/', name: 'timetableSettings', component: () => import('pages/SettingsPage/TimetableSettingsPage/TimetableSettingsPage.vue') },
                ],
              },

              {
                path: 'analytics/',
                component: () => import('pages/AnalyticsPage/layout.vue'),
                children: [
                  { path: '', name: 'analytics', redirect: '/analytics/appointments/' },
                  { path: 'appointments/', name: 'analyticsAppointments', component: () => import('pages/AnalyticsPage/AppointmentsPage/AppointmentsPage.vue') },
                  { path: 'finance/', name: 'analyticsFinance', component: () => import('pages/AnalyticsPage/FinancePage/FinancePage.vue') },
                ],
              },

              { path: 'menu/', name: 'menu', component: () => import('pages/MenuPage/MenuPage.vue') },
            ],
          },

          {
            path: 'specialist/:slug/',
            component: () => import('pages/SpecialistPage/layout.vue'),
            children: [
              { path: 'info/', name: 'specialistInfo', component: () => import('pages/SpecialistPage/InfoPage/InfoPage.vue') },
              { path: 'schedule/', name: 'specialistSchedule', component: () => import('pages/SpecialistPage/SchedulePage/SchedulePage.vue') },
              { path: 'settings/', name: 'specialistSettings', component: () => import('pages/SpecialistPage/SettingsPage/SettingsPage.vue') },
              { path: 'procedures/', name: 'specialistProcedures', component: () => import('pages/SpecialistPage/ProceduresPage/ProceduresPage.vue') },
              { path: 'timetable/', name: 'timetableProcedures', component: () => import('pages/SpecialistPage/TimetablePage/TimetablePage.vue') },
            ],
          },

          { path: 'company/create/', name: 'companyCreate', component: () => import('pages/Auth/CompanyCreate/CompanyCreate.vue') },
        ],
      },

      { path: 'login/', name: 'login', component: () => import('pages/Auth/Login/Login.vue') },
      { path: 'restore/', name: 'restore', component: () => import('pages/Auth/Restore/Restore.vue') },
      { path: 'registration/', name: 'registration', component: () => import('pages/Auth/Registration/Registration.vue') },
      // TODO: Add slash to path
      { path: 'confirm/:slug', name: 'confirmation', component: () => import('pages/Auth/Confirmation/Confirmation.vue') },

      ...widgetRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
