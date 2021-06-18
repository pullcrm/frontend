import { Middleware } from '@nuxt/types'

import dayjs from '~/utils/dayjs'

const middleware: Middleware = async ({ route, redirect }) => {
  const { date } = route.query

  if (
    Boolean(date) === false ||
    dayjs(String(date)).isBefore(dayjs(new Date()), 'day')
  ) {
    redirect({
      ...route,
      query: {
        ...route.query,
        date: dayjs(new Date()).format('YYYY-MM-DD')
      }
    })
  }
}

export default middleware
