import { TIME_STEP } from '~/constants'

import { setTime } from '~/utils/date-time'

function getWorkingHours (open, close) {
  const hours = []

  let from = setTime(new Date(), open)

  do {
    hours.push(from.format('HH:mm'))

    from = from.add(15, 'm')
  } while (from.format('HH:mm') !== close)

  return [...hours, close]
}

export default class Time {
  open: string
  close: string

  constructor ({ open, close }) {
    this.open = open
    this.close = close
  }

  get workingHours () {
    return getWorkingHours(this.open, this.close)
  }

  shiftTimeDownBySteps (time, steps) {
    let timeIndex = this.workingHours.indexOf(time) - steps

    while (!this.workingHours[timeIndex]) {
      timeIndex += 1
    }

    return this.workingHours[timeIndex]
  }

  shiftTimeUpBySteps (time, steps) {
    let timeIndex = this.workingHours.indexOf(time) + steps

    while (!this.workingHours[timeIndex]) {
      timeIndex -= 1
    }

    return this.workingHours[timeIndex]
  }

  getTimePoints ({ timeStart, totalTime }) {
    const fromIndex = this.workingHours.indexOf(timeStart)

    let toIndex = fromIndex + (totalTime / Number(TIME_STEP)) - 1

    if (!this.workingHours[toIndex]) {
      toIndex = this.workingHours.length - 1
    }

    return this.workingHours.slice(fromIndex, toIndex + 1)
  }
}
