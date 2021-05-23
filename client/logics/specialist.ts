import { SPECIALIST, MANAGER, ADMIN } from '~/constants/roles'

export const statuses = {
  ALL: {
    id: 1,
    value: 'На всех платформах'
  },
  DASHBOARD: {
    id: 2,
    value: 'Только в админ панеле'
  },
  HIDE: {
    id: 3,
    value: 'Не доступен'
  }
}

export function getRoleNameByAlias (alias) {
  return {
    [ADMIN]: 'Руководители',
    [MANAGER]: 'Менеджеры',
    [SPECIALIST]: 'Специалисты'
  }[alias]
}
