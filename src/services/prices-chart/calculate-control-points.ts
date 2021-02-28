interface IPoint {
  x: number,
  y: number
}

/**
 * Calculate line
 */
function calculateLine (point1: IPoint, point2: IPoint) {
  const { x: x1, y: y1 } = point1
  const { x: x2, y: y2 } = point2

  return {
    angle: Math.atan(
      (y2 - y1) /
      (x2 - x1)
    ),
    length: Math.sqrt(
      (y2 - y1) ** 2 +
      (x2 - x1) ** 2
    )
  }
}

/**
 * Calculate control points
 */
export function calculateControlPoints (
  point1: IPoint,
  point2: IPoint,
  point3: IPoint,
  { tense }: { tense: number }
) {
  if (
    point1.x === point2.x &&
    point1.y === point2.y
  ) {
    return { point1, point2: point1 }
  }

  if (
    point2.x === point3.x &&
    point2.y === point3.y
  ) {
    return { point1: point2, point2 }
  }

  const line1 = calculateLine(
    point1,
    point2
  )

  const line2 = calculateLine(
    point2,
    point3
  )

  const line3 = calculateLine(
    point1,
    point3
  )

  // Calculate the offset from the `point2`
  const offset = line3.length * tense

  // Calculate the deviation from the `point2`
  // = 0 if the `line1` length is equal to the `line2` length
  // > 0 if the `line1` length is greater than the `line2` length
  // < 0 if the `line2` length is greater than the `line1` length
  let deviation: number
  deviation = (line1.length - line2.length) * tense * 3/* optimal */
  // The deviation couldn't be greater than +offset
  deviation = Math.min(deviation, +offset)
  // The deviation couldn't be smaller than -offset
  deviation = Math.max(deviation, -offset)

  // Calculate the 1st control point coordinates
  const controlPoint1 = {
    x: point2.x - Math.cos(line3.angle) * (offset + deviation),
    y: point2.y - Math.sin(line3.angle) * (offset + deviation)
  }

  // Calculate the 2nd control point coordinates
  const controlPoint2 = {
    x: point2.x + Math.cos(line3.angle) * (offset - deviation),
    y: point2.y + Math.sin(line3.angle) * (offset - deviation)
  }

  return {
    point1: controlPoint1,
    point2: controlPoint2
  }
}
