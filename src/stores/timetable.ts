import { defineStore } from 'pinia'
import uniq from 'lodash/uniq'
import { getWorkingHours } from '~/utils/time'

import { normalizeTimetable } from '~/logics/company'
import type { ITimetable } from '~/services/api'
import { formatDate } from '~/utils/date-time'

interface ITimetableDict {
  specialistId?: any | null
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
      const realHours = Object.values(state.timetableDict)
        .filter(Boolean)
        .reduce((acc, { start, end }) => [
          ...acc,
          ...getWorkingHours(start, end),
        ], [])

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
      const scheduleStore = useScheduleStore()
      const specialistsStore = useSpecialistsStore()

      const fetchTimetable = async (id: number) => {
        const result = await this.$api.timetable.find(id, { startDate: scheduleStore.date }).then((res) => {
          return res.map((item: any) => {
            return {
              date: formatDate(item.startDateTime, 'YYYY-MM-DD'),
              start: formatDate(item.startDateTime, 'HH:mm'),
              end: formatDate(item.endDateTime, 'HH:mm'),
              ...item,
            }
          })
        })

        return {
          [id]: result[0],
        }
      }

      const promises = specialistsStore.specialists.map(({ id }) => {
        return fetchTimetable(id)
      })

      this.timetableDict = await Promise.all(promises)
        .then(res => res.reduce((acc, item) => Object.assign(acc, item), {}))
    },
  },
})
