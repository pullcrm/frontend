import animatedScrollTo from 'animated-scroll-to'

type IOptions = Parameters<typeof animatedScrollTo>[1]

export function computeScrollOffset(element: HTMLElement | Element) {
  const scrollOffset = window
    .getComputedStyle(element)
    .getPropertyValue('--scroll-offset')

  return Number.parseInt(scrollOffset || '0')
}

export function scrollToElement(element: HTMLElement | Element, options: IOptions = {}) {
  const verticalOffset = options.verticalOffset ?? -1 * computeScrollOffset(element)

  return animatedScrollTo(element, {
    passive: true,
    maxDuration: 250,
    verticalOffset,
    ...options,
  })
}

export function scrollTo(y: number, options: IOptions = {}) {
  return animatedScrollTo(y, {
    passive: true,
    maxDuration: 250,
    ...options,
  })
}
