const dynamicPage = (importer) => () => {
  return importer().then((mod) => mod.default || mod)
}

const layout = 'Widget'

const BarbershopLondon = dynamicPage(() => import('./pages/BarbershopLondon/BarbershopLondon.vue'))

export default [
  {
    path: '/widgets/barbershop-london/',
    component: BarbershopLondon,
    meta: { layout }
  }
]
