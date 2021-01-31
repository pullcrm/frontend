/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config()

const { writeFileSync } = require('fs')

const moment = require('moment')

const step = process.env.VUE_APP_CALENDAR_TIME_STEP

function hoursGenerate () {
  let currentTime = moment(new Date()).set({
    hour: 5,
    minutes: 0,
    second: 0
  })

  const hours = []

  while (currentTime.format('HH:mm') !== '23:15') {
    hours.push(currentTime.format('HH:mm'))

    currentTime = currentTime.add(step, 'm')
  }

  return hours
}

function durationGenerate () {
  const list = []

  let hour = 0
  let minute = 0

  while (hour < 4) {
    const time = []

    minute += 15

    if (minute === 60) {
      hour++
      minute = 0
    }

    if (hour > 0) {
      time.push(`${hour} ${pluralize(hour, 'час', 'часа', 'часов')}`)
    }

    if (minute > 0) {
      time.push(`${minute} минут`)
    }

    list.push({
      name: time.join(' '),
      value: hour * 60 + minute
    })
  }

  return list
}

function pluralize (number, one, two, five) {
  number = Math.abs(number)
  number %= 100

  if (number >= 5 && number <= 20) {
    return five
  }

  number %= 10

  if (number === 1) {
    return one
  }

  if (number >= 2 && number <= 4) {
    return two
  }

  return five
}

writeFileSync('./src/constants/generated.ts', `/* eslint-disable */
export const WORKING_HOURS = ${JSON.stringify(hoursGenerate())}

export const DURATIONS = ${JSON.stringify(durationGenerate())}
`)
