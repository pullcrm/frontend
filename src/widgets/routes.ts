export default [
  {
    path: 'widgets/full/',
    component: () => import('./FullWidget/layout.vue'),
    children: [
      {
        path: '',
        name: 'fullWidgetSpecialistsPage',
        component: () => import('./FullWidget/pages/SpecialistsPage/SpecialistsPage.vue'),
      },
      {
        path: 'specialist/',
        name: 'fullWidgetSpecialistPage',
        component: () => import('./FullWidget/pages/SpecialistPage/SpecialistPage.vue'),
      },
      {
        path: 'procedures/',
        name: 'fullWidgetProceduresPage',
        component: () => import('./FullWidget/pages/ProceduresPage/ProceduresPage.vue'),
      },
      {
        path: 'pick-date/',
        name: 'fullWidgetPickDatePage',
        component: () => import('./FullWidget/pages/PickDatePage/PickDatePage.vue'),
      },
      {
        path: 'confirmation/',
        name: 'fullWidgetConfirmationPage',
        component: () => import('./FullWidget/pages/ConfirmationPage/ConfirmationPage.vue'),
      },
      {
        path: 'order/',
        name: 'fullWidgetOrderPage',
        component: () => import('./FullWidget/pages/OrderPage/OrderPage.vue'),
      },
    ],
  },
]
