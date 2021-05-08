export function createStorage (getStorage?: () => Storage) {
  const isDebug = process.env.NODE_ENV === 'development'

  return {
    getItem (key: string) {
      if (isDebug) console.log(`[Storage] Get item by key '${key}'`)

      try {
        return getStorage().getItem(key)
      } catch {
        return null
      }
    },

    setItem (key: string, value: string) {
      if (isDebug) console.log(`[Storage] Set item by key '${key}'`)

      try {
        return getStorage().setItem(key, value)
      } catch {
        return null
      }
    },

    removeItem (key: string) {
      if (isDebug) console.log(`[Storage] Remove item by key '${key}'`)

      try {
        return getStorage().removeItem(key)
      } catch {
        return null
      }
    }
  }
}
