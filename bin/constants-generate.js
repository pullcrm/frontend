/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config()

const { writeFileSync } = require('fs')

const moment = require('moment')

const step = process.env.VUE_APP_CALENDAR_TIME_STEP

function hoursGenerate () {
  let currentTime = moment(new Date()).set({
    hour: 10,
    minutes: 0,
    second: 0
  })

  const endTime = moment(new Date()).set({
    hour: 20,
    minutes: 0,
    second: 0
  })

  const hours = []

  while (currentTime.unix() <= endTime.unix()) {
    const hour = currentTime.hour()
    const minute = currentTime.minute()

    hours.push(`${hour}:${minute > 0 ? minute : '00'}`)

    currentTime = currentTime.add(step, 'm')
  }

  return hours
}

writeFileSync('./src/constants/generated.js', `/* eslint-disable */
export const WORKING_HOURS = ${JSON.stringify(hoursGenerate())}

export const WORKING_HOURS_SLOTS = WORKING_HOURS.reduce((result, hour) => {
  result[hour] = false

  return result
}, {})
`)
