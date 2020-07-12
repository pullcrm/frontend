function checkStorage () {
  try {
    const x = 'storageTest'

    global.localStorage.setItem(x, x)
    global.localStorage.removeItem(x)

    return true
  } catch {
    return false
  }
}

function storageFactory () {
  if (global.localStorage && checkStorage()) return global.localStorage

  return {
    getItem () {
      return null
    },

    setItem () {
      return null
    },

    removeItem () {
      return null
    }
  }
}

const wrapper = storageFactory()

export default wrapper
