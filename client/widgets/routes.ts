const dynamicPage = (importer) => () => {
  return importer().then((mod) => mod.default || mod)
}

const FullWidgetSpecialistsPage = dynamicPage(() => import('./FullWidget/pages/SpecialistsPage/SpecialistsPage.vue'))
const FullWidgetSpecialistPage = dynamicPage(() => import('./FullWidget/pages/SpecialistPage/SpecialistPage.vue'))
const FullWidgetProceduresPage = dynamicPage(() => import('./FullWidget/pages/ProceduresPage/ProceduresPage.vue'))
const FullWidgetPickDatePage = dynamicPage(() => import('./FullWidget/pages/PickDatePage/PickDatePage.vue'))
const FullWidgetConfirmationPage = dynamicPage(() => import('./FullWidget/pages/ConfirmationPage/ConfirmationPage.vue'))
const FullWidgetOrderPage = dynamicPage(() => import('./FullWidget/pages/OrderPage/OrderPage.vue'))

export default [
  {
    path: '/widgets/full/',
    name: 'fullWidgetSpecialistsPage',
    component: FullWidgetSpecialistsPage,
    meta: { public: true }
  },
  {
    path: '/widgets/full/specialist/',
    name: 'fullWidgetSpecialistPage',
    component: FullWidgetSpecialistPage,
    meta: { public: true }
  },
  {
    path: '/widgets/full/procedures/',
    name: 'fullWidgetProceduresPage',
    component: FullWidgetProceduresPage,
    meta: { public: true }
  },
  {
    path: '/widgets/full/pick-date/',
    name: 'fullWidgetPickDatePage',
    component: FullWidgetPickDatePage,
    meta: { public: true }
  },
  {
    path: '/widgets/full/confirmation/',
    name: 'fullWidgetConfirmationPage',
    component: FullWidgetConfirmationPage,
    meta: { public: true }
  },
  {
    path: '/widgets/full/order/',
    name: 'fullWidgetOrderPage',
    component: FullWidgetOrderPage,
    meta: { public: true }
  }
]
