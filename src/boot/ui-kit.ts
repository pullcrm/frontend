import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const UiKit = import.meta.globEager('ui/**/*.vue')

  for (const key in UiKit) {
    // @ts-expect-error
    const name = key.split('/').pop().replace('.vue', '')

    app.component(`Ui${name}`, UiKit[key].default)
  }
})
