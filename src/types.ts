export interface IAppointment {
  client: IClientSimple
  type?: string
  service: string
  price: number
  barber?: string
  staff?: any
  time_start?: string
  time_end?: string
}

export interface IClientSimple {
  name: string
  phone: string
}

export interface IBarber {
  id: number
  name: string
  avatar?: any
}

export interface IService {
  id: number
  name: string
  slug: string
  price: number
  company?: any
}

export interface IAppointmentsAA {
  categoryIds: number[]
  propertyValueIds: number[]
  mainPropertyValueIds: number[]
  tradePropertyValueIds: number[]
  minPrice?: number
  maxPrice?: number
}

export interface IState {
  // filter: IApiProductFilters
  // query: IStateQuery
}
