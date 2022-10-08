import { UNCATEGORIZED_TITLE } from '~/constants'

export interface IGroupItem {
  category: any
  procedures: any[]
  categoryTitle: string
}

export function normalizeProcedureParams(procedure: any) {
  const {
    name,
    price,
    duration,
    category,
    description,
    specialistIds,
  } = procedure

  return {
    name,
    price: Number(price),
    duration,
    categoryId: null,
    ...(category && { categoryId: category.id }),
    description,
    specialistIds: specialistIds || [],
  }
}

export function groupByCategory(procedures: any, categories: any): IGroupItem[] {
  const group = categories.map((category: any) => {
    return {
      category,
      procedures: filterProceduresByCategoryId(procedures, category.id),
      categoryTitle: category.name,
    }
  }, {})

  const uncategorizedProcedures = procedures.filter(({ category }: any) => !category)

  if (uncategorizedProcedures.length > 0) {
    group.push({
      category: null,
      procedures: uncategorizedProcedures,
      categoryTitle: UNCATEGORIZED_TITLE,
    })
  }

  return group
}

function filterProceduresByCategoryId(procedures: any, categoryId: number) {
  return procedures.filter(({ category }: any) => {
    if (!category)
      return false

    return category.id === categoryId
  })
}
