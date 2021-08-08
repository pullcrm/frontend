import { SPECIALIST, MANAGER, ADMIN } from '~/constants/roles'

export const statuses = {
  ALL: {
    id: 1,
    name: 'ALL',
    value: 'На всех платформах'
  },
  DASHBOARD: {
    id: 2,
    name: 'DASHBOARD',
    value: 'Только в админ панеле'
  },
  HIDE: {
    id: 3,
    name: 'HIDE',
    value: 'Не доступен'
  }
}

export const roles = {
  [ADMIN]: {
    id: 1,
    name: 'Руководитель',
    value: ADMIN
  },
  [MANAGER]: {
    id: 4,
    name: 'Менеджер',
    value: MANAGER
  },
  [SPECIALIST]: {
    id: 3,
    name: 'Специалист',
    value: SPECIALIST
  }
}

export function getRoleNameByAlias (alias) {
  return {
    [ADMIN]: 'Руководители',
    [MANAGER]: 'Менеджеры',
    [SPECIALIST]: 'Специалисты'
  }[alias]
}

export function normalizeSpecialists (specialists) {
  return specialists.map(item => {
    return {
      ...item,
      fullName: item.user.fullName
    }
  })
}
