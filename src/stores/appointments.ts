import { defineStore } from 'pinia'

import { CANCELED, COMPLETED, IN_PROGRESS, IN_QUEUE } from '~/constants/appointment'

import { normalizeAppointmentParams } from '~/logics/appointment'
import type dayjs from '~/utils/dayjs'
import { setTime } from '~/utils/time'

export interface IState {
  queue: any[]
  appointments: any[]
}

export const useAppointmentsStore = defineStore('appointments', {
  state: (): IState => ({
    queue: [],
    appointments: [],
  }),
  getters: {
    appointmentsDict: (state) => {
      return state.appointments.reduce((dict, appointment) => {
        return {
          ...dict,
          [appointment.id]: appointment,
        }
      }, {} as Record<number, any>)
    },

    appointmentById() {
      return (appointmentId: number) => {
        return this.appointmentsDict[appointmentId]
      }
    },
  },
  actions: {
    async fetch() {
      const scheduleStore = useScheduleStore()

      const appointments = await this.$api.appointments.all({
        date: scheduleStore.date,
        status: [IN_PROGRESS, CANCELED, COMPLETED],
      })

      // TODO: Fix startTime on api
      this.appointments = appointments.map((item: any) => {
        const startDate = setTime(new Date(), item.startTime.slice(0, 5))
        const endDate = item.procedures
          .reduce((acc: dayjs.Dayjs, { duration }: any) => acc.add(duration, 'minute'), startDate)

        return {
          ...item,
          startTime: startDate.format('HH:mm'),
          endTime: endDate.format('HH:mm'),
        }
      })
    },

    async fetchQueue() {
      const queue = await this.$api.appointments.all({
        status: [IN_QUEUE],
      })

      // TODO: Fix startTime on api
      this.queue = queue.map((item: any) => ({
        ...item,
        startTime: item.startTime?.slice(0, 5) ?? null,
      }))
    },

    async create(payload: any) {
      const form = normalizeAppointmentParams(payload)

      await this.$api.appointments.create(form)
    },

    async update(payload: any) {
      const { id } = payload

      const form = normalizeAppointmentParams(payload)

      await this.$api.appointments.update(id, form)
    },
  },
})
