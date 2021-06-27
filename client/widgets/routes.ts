const dynamicPage = (importer) => () => {
  return importer().then((mod) => mod.default || mod)
}

const BaseWidgetSpecialists = dynamicPage(() => import('./BaseWidget/pages/BaseWidgetSpecialists/BaseWidgetSpecialists.vue'))
const BaseWidgetServices = dynamicPage(() => import('./BaseWidget/pages/BaseWidgetServices/BaseWidgetServices.vue'))
const BaseWidgetCheckout = dynamicPage(() => import('./BaseWidget/pages/BaseWidgetCheckout/BaseWidgetCheckout.vue'))
const BaseWidgetOrder = dynamicPage(() => import('./BaseWidget/pages/BaseWidgetOrder/BaseWidgetOrder.vue'))

const FullWidgetSpecialistsPage = dynamicPage(() => import('./FullWidget/pages/SpecialistsPage/SpecialistsPage.vue'))
const FullWidgetSpecialistPage = dynamicPage(() => import('./FullWidget/pages/SpecialistPage/SpecialistPage.vue'))
const FullWidgetProceduresPage = dynamicPage(() => import('./FullWidget/pages/ProceduresPage/ProceduresPage.vue'))
const FullWidgetPickDatePage = dynamicPage(() => import('./FullWidget/pages/PickDatePage/PickDatePage.vue'))
const FullWidgetConfirmationPage = dynamicPage(() => import('./FullWidget/pages/ConfirmationPage/ConfirmationPage.vue'))
const FullWidgetOrderPage = dynamicPage(() => import('./FullWidget/pages/OrderPage/OrderPage.vue'))

const checkRouterBeforeEnter = (to, from, next) => {
  if (!from.name) {
    next({
      ...to,
      name: 'BaseWidgetSpecialists'
    })
  }

  next()
}

export default [
  // Legacy start
  {
    path: '/widgets/barbershop-london/',
    redirect: '/widgets/base/2/'
  },

  {
    path: '/widgets/base/:companyId/',
    name: 'BaseWidgetSpecialists',
    component: BaseWidgetSpecialists,
    meta: { public: true }
  },
  {
    path: '/widgets/base/:companyId/services/',
    name: 'BaseWidgetServices',
    component: BaseWidgetServices,
    meta: { public: true },
    beforeEnter: checkRouterBeforeEnter
  },
  {
    path: '/widgets/base/:companyId/checkout/',
    name: 'BaseWidgetCheckout',
    component: BaseWidgetCheckout,
    meta: { public: true },
    beforeEnter: checkRouterBeforeEnter
  },
  {
    path: '/widgets/base/:companyId/order/',
    name: 'BaseWidgetOrder',
    component: BaseWidgetOrder,
    meta: { public: true },
    beforeEnter: checkRouterBeforeEnter
  },
  // Legacy end

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
