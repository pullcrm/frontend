export function normalizeProcedureParams (procedure) {
  const {
    name,
    price,
    duration,
    category,
    description
  } = procedure

  return {
    name,
    price: Number(price),
    duration,
    ...(category && { categoryId: category.id }),
    description
  }
}
