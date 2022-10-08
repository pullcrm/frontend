import { ADMIN, MANAGER, SPECIALIST } from '~/constants/roles'

export const statuses = {
  ALL: {
    id: 1,
    name: 'ALL',
    value: 'На всіх платформах',
  },
  DASHBOARD: {
    id: 2,
    name: 'DASHBOARD',
    value: 'Тільки в адмін панелі',
  },
  HIDE: {
    id: 3,
    name: 'HIDE',
    value: 'Не доступний',
  },
}

export const roles = {
  [ADMIN]: {
    id: 1,
    name: 'Керівник',
    value: ADMIN,
  },
  [MANAGER]: {
    id: 4,
    name: 'Менеджер',
    value: MANAGER,
  },
  [SPECIALIST]: {
    id: 3,
    name: 'Спеціаліст',
    value: SPECIALIST,
  },
}

export function getRoleNameByAlias(alias: string) {
  return {
    [ADMIN]: 'Керівники',
    [MANAGER]: 'Менеджери',
    [SPECIALIST]: 'Спеціалісти',
  }[alias]
}

export function normalizeSpecialists(specialists: any) {
  return specialists.map((item: any) => {
    return {
      ...item,
      fullName: item.user.fullName,
    }
  })
}
