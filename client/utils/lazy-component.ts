export function lazyComponent (
  resolveComponent: () => Promise<typeof import('*.vue')>
) {
  return async () => {
    const module = await resolveComponent()

    return module.default ?? module
  }
}
