export function waitPageLoad(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
    }
    else {
      window.addEventListener('load', function onLoad() {
        window.removeEventListener('load', onLoad)

        resolve()
      })
    }
  })
}
