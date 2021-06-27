import { ICompaniesCreateParams, ITimetable } from '~/services/api'

export function normalizeCompanyParams (company): ICompaniesCreateParams {
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
    instagram
  } = company

  return {
    name,
    cityId: city.id,
    typeId: type.id,
    phone,
    logoId,
    address,
    description,
    viber,
    telegram,
    facebook,
    instagram
  }
}

export function normalizeSmsSettingsParams (params) {
  const {
    hasRemindSMS,
    hasCreationSMS,
    remindSMSMinutes,
    remindSMSTemplate,
    creationSMSTemplate
  } = params

  return {
    hasRemindSMS,
    hasCreationSMS,
    remindSMSMinutes,
    remindSMSTemplate: remindSMSTemplate || undefined,
    creationSMSTemplate: creationSMSTemplate || undefined
  }
}

export function normalizeTimetable (timetable: ITimetable) {
  return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    .reduce((acc, item) => {
      return {
        ...acc,
        [item]: parseTimetableItem(timetable[item])
      }
    }, {})
}

function parseTimetableItem (TimetableItem) {
  const [opened, from, to] = TimetableItem.split(';')

  return {
    opened: opened === 'true',
    from,
    to
  }
}
