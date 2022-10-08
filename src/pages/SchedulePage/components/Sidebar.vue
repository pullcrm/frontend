<script lang="ts" setup>
import ScheduleDatePicker from './ScheduleDatePicker.vue'
import { IN_QUEUE } from '~/constants/appointment'

import Appointment from '~/components/Appointment/Appointment.vue'

const popupStore = usePopupStore()
const appointmentsStore = useAppointmentsStore()

const queue = computed(() => {
  return appointmentsStore.queue
})

function addAppointment() {
  popupStore.show({
    name: 'appointment',
    props: {
      type: 'new',
      defaultStatus: IN_QUEUE,
    },
  })
}

function openAppointment(appointment: any) {
  popupStore.show({
    name: 'appointment',
    props: {
      type: 'edit',
      appointment,
    },
  })
}
</script>

<template>
  <div class="schedule-page-sidebar">
    <div class="schedule-page-sidebar__inner">
      <ScheduleDatePicker
        class="schedule-page-sidebar__schedule-date-picker"
      />

      <UiTitle
        size="s"
        class="schedule-page-sidebar__title"
      >
        Черга
      </UiTitle>

      <Appointment
        v-for="appointment in queue"
        :key="`queue-${appointment.id}`"
        :appointment="appointment"
        class="schedule-page-sidebar__appointment"
        @open="openAppointment"
      />

      <div
        class="schedule-page-sidebar__action"
        @click="addAppointment"
      >
        <UiText
          size="l"
          responsive
          left-icon="outlined/note-pencil"
        >
          Додати в чергу
        </UiText>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Sidebar.scss"></style>
