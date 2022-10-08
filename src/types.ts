import type { RouteLocationRaw } from 'vue-router'

export interface INavigationItem {
  name: string
  to?: RouteLocationRaw
}

export interface IItem {
  title: string
  icon?: string
  subTitle?: string
  isPrefix?: boolean
}
