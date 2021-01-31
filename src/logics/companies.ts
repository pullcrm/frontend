export function normalizeCompanyInfo (payload) {
  const {
    id,
    role,
    user,
    status,
    company,
    description
  } = payload

  return {
    role,
    company,
    profile: {
      ...user,
      status,
      description,
      specialistId: id
    }
  }
}
