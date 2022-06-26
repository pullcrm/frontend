import { defineStore } from 'pinia'
import dayjs from '~/utils/dayjs'
import { getWorkingHours } from '~/utils/time'

import { normalizeTimetable } from '~/logics/company'
import type { ITimetable } from '~/services/api'

interface IState {
  timetable: ITimetable | null
}

export const useTimetableStore = defineStore('timetable', {
  state: (): IState => ({
    timetable: null,
  }),
  getters: {
    normalizeTimetable: (state) => {
      return normalizeTimetable(state.timetable as ITimetable)
    },

    timeWork() {
      const scheduleStore = useScheduleStore()

      const { date } = scheduleStore
      const day = dayjs(date).locale('en').format('dddd').toLowerCase() as string

      // @ts-expect-error
      return this.normalizeTimetable[day]
    },

    workingHours() {
      // @ts-expect-error
      const { from, to } = this.timeWork

      return getWorkingHours(from, to)
    },
  },
  actions: {
    async fetch() {
      const authStore = useAuthStore()

      const timetable = await this.$api.timetable.get(authStore.companyId)

      this.timetable = timetable
    },
  },
})
