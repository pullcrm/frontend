import { UNCATEGORIZED_TITLE } from '~/constants'

export interface IGroupItem {
  category: any,
  procedures: any[],
  categoryTitle: string
}

export function normalizeProcedureParams (procedure) {
  const {
    name,
    price,
    duration,
    category,
    description,
    specialistIds
  } = procedure

  return {
    name,
    price: Number(price),
    duration,
    categoryId: null,
    ...(category && { categoryId: category.id }),
    description,
    specialistIds: specialistIds || []
  }
}

export function groupByCategory (procedures, categories): IGroupItem[] {
  const group = categories.map(category => {
    return {
      category,
      procedures: filterProceduresByCategoryId(procedures, category.id),
      categoryTitle: category.name
    }
  }, {})

  const uncategorizedProcedures = procedures.filter(({ category }) => !category)

  if (uncategorizedProcedures.length > 0) {
    group.push({
      category: null,
      procedures: uncategorizedProcedures,
      categoryTitle: UNCATEGORIZED_TITLE
    })
  }

  return group
}

function filterProceduresByCategoryId (procedures, categoryId) {
  return procedures.filter(({ category }) => {
    if (!category) return false

    return category.id === categoryId
  })
}
