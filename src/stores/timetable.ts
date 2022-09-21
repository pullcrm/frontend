import { defineStore } from 'pinia'
import uniq from 'lodash/uniq'
import { getWorkingHours } from '~/utils/time'

import { normalizeTimetable } from '~/logics/company'
import type { ITimetable } from '~/services/api'
import { fetchTimetable } from '~/logics/timetable'

interface ITimetableDict {
  specialistId?: {
    [date: string]: any
  }
}

interface IState {
  timetable: ITimetable | null
  timetableDict: ITimetableDict
}

export const useTimetableStore = defineStore('timetable', {
  state: (): IState => ({
    timetable: null,

    // New
    timetableDict: {},
  }),
  getters: {
    normalizeTimetable: (state) => {
      return normalizeTimetable(state.timetable as ITimetable)
    },

    // New
    maxWorkingHours(state) {
      const scheduleStore = useScheduleStore()

      const realHours = Object.values(state.timetableDict)
        .map((item: any) => item[scheduleStore.date])
        .filter(Boolean)
        .reduce((acc, item) => {
          const { start, end } = item

          return [...acc, ...getWorkingHours(start, end)]
        }, [])

      // TODO: Add fallback if no one user has timetable
      return uniq(realHours).sort() as string[]
    },

    fromMaxWorkingHours(): string {
      return this.maxWorkingHours[0]
    },

    toMaxWorkingHours(): string {
      return this.maxWorkingHours[this.maxWorkingHours.length - 1]
    },
  },
  actions: {
    async fetch() {
      const authStore = useAuthStore()

      const timetable = await this.$api.timetable.get(authStore.companyId)

      this.timetable = timetable
    },

    // New
    async fetchAll() {
      const specialistsStore = useSpecialistsStore()

      const promises = specialistsStore.specialists.map(({ id }) => {
        return fetchTimetable(id)
      })

      this.timetableDict = await Promise.all(promises)
        .then(res => res.reduce((acc, item) => Object.assign(acc, item), {}))
    },
  },
})
