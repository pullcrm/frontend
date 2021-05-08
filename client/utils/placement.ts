type Direction = 'top' | 'left' | 'bottom' | 'right';

export type Placement =
  'top_start' | 'top_middle' | 'top_end' |
  'left_start' | 'left_middle' | 'left_end' |
  'right_start' | 'right_middle' | 'right_end' |
  'bottom_start' | 'bottom_middle' | 'bottom_end' | Direction;

export interface Options {
  container: DOMRect,
  placement: Placement,
  variantFlipOrder: Record<string, string[]>,
  positionFlipOrder: Record<string, string[]>,
  margin: number,
  reference: HTMLElement
}

interface AvailablePositions {
  top: number,
  bottom: number,
  left: number,
  right: number
}

interface AvailableVariants {
  'vertical_start': number,
  'vertical_middle': number,
  'vertical_end': number,
  'horizontal_start': number,
  'horizontal_middle': number,
  'horizontal_end': number
}

const defaultOptions = {
  variantFlipOrder: {
    start: ['start', 'middle', 'end'],
    middle: ['middle', 'start', 'end'],
    end: ['end', 'middle', 'start']
  },
  positionFlipOrder: {
    top: ['top', 'bottom', 'right', 'left'],
    right: ['right', 'left', 'top', 'bottom'],
    bottom: ['bottom', 'top', 'right', 'left'],
    left: ['left', 'right', 'bottom', 'top']
  },
  position: 'bottom',
  margin: 8
}

/**
 * Repositions an element once using the provided options and elements.
 * @param popper Popper element
 * @param options Optional, additional options
 */
export const computePlacement = (
  popper: HTMLElement,
  options: Partial<Options>
): Placement => {
  const {
    container,
    margin,
    placement,
    variantFlipOrder,
    reference,
    positionFlipOrder
  } = {
    container: document.documentElement.getBoundingClientRect(),
    ...defaultOptions,
    ...options
  }

  /**
   * Reset position to resolve viewport
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed
   */
  const refBox = reference.getBoundingClientRect()
  const popBox = popper.getBoundingClientRect()

  /**
   * Holds coordinates of top, left, bottom and right alignment
   */
  const positionStore: AvailablePositions = {
    top: refBox.top - popBox.height - margin,
    right: refBox.right + margin,
    bottom: refBox.bottom + margin,
    left: refBox.left - popBox.width - margin
  }

  /**
   * Holds corresponding variants (start, middle, end).
   * The values depend on horizontal / vertical orientation
   */
  const variantStore: AvailableVariants = {
    vertical_start: refBox.left,
    vertical_middle: refBox.left + refBox.width / 2 + -popBox.width / 2,
    vertical_end: refBox.left + refBox.width - popBox.width,
    horizontal_start: refBox.top,
    horizontal_middle: refBox.bottom - refBox.height / 2 - popBox.height / 2,
    horizontal_end: refBox.bottom - popBox.height
  }

  // Extract position and variant
  // Top-start -> top is "position" and "start" is the variant
  const [posKey, varKey = 'middle'] = placement.split('_')
  const positions = positionFlipOrder[posKey]
  const variants = variantFlipOrder[varKey]

  // Try out all possible combinations, starting with the preferred one.
  const { top, left, bottom, right } = container

  for (const position of positions) {
    const vertical = (position === 'top' || position === 'bottom')

    // The position-value
    const positionVal = positionStore[position as keyof AvailablePositions]

    /**
     * box refers to the size of the popper element. Depending on the orientation this is width or height.
     * The limit is the corresponding, maximum value for this position.
     */
    const [positionSize, variantSize] = vertical ? [popBox.height, popBox.width] : [popBox.width, popBox.height]
    const [positionMaximum, variantMaximum] = vertical ? [bottom, right] : [right, bottom]
    const [positionMinimum, variantMinimum] = vertical ? [top, left] : [left, top]

    // Skip pre-clipped values
    if (positionVal < positionMinimum || (positionVal + positionSize) > positionMaximum) {
      continue
    }

    for (const variant of variants) {
      // The position-value, the related size value of the popper and the limit
      const variantVal = variantStore[(`${vertical ? 'vertical' : 'horizontal'}_${variant}`) as keyof AvailableVariants]

      if (variantVal < variantMinimum || (variantVal + variantSize) > variantMaximum) {
        continue
      }

      return (`${position}_${variant}`) as Placement
    }
  }

  return placement
}
