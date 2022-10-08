export function waitIdle({ timeout = 0 } = {}): Promise<void> {
  return new Promise((resolve) => {
    requestIdleCallback(() => resolve(), { timeout })
  })
}
