import { ICompaniesCreateParams } from '~/services/api'

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
