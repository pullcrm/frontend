export function copyObject<T extends object> (object: T): T {
  return JSON.parse(JSON.stringify(object))
}

export function cleanObject<T> (obj: T): Partial<T> {
  const newObj = {}

  for (const prop in obj) {
    // TODO think about types
    // @ts-ignore
    if (obj[prop] || obj[prop] === false) {
      // @ts-ignore
      newObj[prop] = obj[prop]
    }
  }

  return newObj
}
