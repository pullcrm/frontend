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

writeFileSync('./src/constants/generated.ts', `/* eslint-disable */
export const WORKING_HOURS = ${JSON.stringify(hoursGenerate())}
`)
