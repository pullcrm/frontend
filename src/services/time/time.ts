import { WORKING_HOURS } from '@/constants/generated'
import { TIME_STEP } from '@/constants'

export default class Time {
  open: string
  close: string

  workingHours: string[]

  constructor ({ open, close }) {
    this.open = open
    this.close = close

    const fromIndex = WORKING_HOURS.indexOf(open)
    const toIndex = WORKING_HOURS.indexOf(close)

    this.workingHours = WORKING_HOURS.slice(fromIndex, toIndex + 1)
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
