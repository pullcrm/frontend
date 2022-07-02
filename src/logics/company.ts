import type { ICompaniesCreateParams, ITimetable } from '~/services/api'
import { getPhoneNumber } from '~/utils/format-phone'

export interface ITimetableItem {
  opened: boolean
  from: string
  to: string
}

export function normalizeCompany(company: any) {
  return {
    ...company,
    phone: getPhoneNumber(company.phone),
    viber: company.viber || '',
    address: company.address || '',
    telegram: company.telegram || '',
    facebook: company.facebook || '',
    instagram: company.instagram || '',
    description: company.description || '',
    widget_setting: company.widget_setting || {},
  }
}

export function normalizeCompanyParams(company: any): ICompaniesCreateParams {
  const {
    name,
    city,
    type,
    phone,
    logoId,
    address,
    description,
    viber,
    telegram,
    facebook,
    instagram,
  } = company

  return {
    name,
    cityId: city.id,
    typeId: type.id,
    phone: getPhoneNumber(phone),
    logoId: logoId || undefined,
    address,
    description,
    viber,
    telegram,
    facebook,
    instagram,
  }
}

export function normalizeSmsSettingsParams(params: any) {
  const {
    hasRemindSMS,
    hasCreationSMS,
    remindSMSMinutes,
    remindSMSTemplate,
    creationSMSTemplate,
  } = params

  return {
    hasRemindSMS,
    hasCreationSMS,
    remindSMSMinutes,
    remindSMSTemplate: remindSMSTemplate || undefined,
    creationSMSTemplate: creationSMSTemplate || undefined,
  }
}

export function normalizeTimetable(timetable: ITimetable): Record<string, ITimetableItem> {
  return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    .reduce((acc, item) => {
      return {
        ...acc,
        [item]: parseTimetableItem(timetable[item as keyof ITimetable]),
      }
    }, {})
}

function parseTimetableItem(item: any): ITimetableItem {
  const [opened, from, to] = item.split(';')

  return {
    opened: opened === 'true',
    from,
    to,
  }
}
