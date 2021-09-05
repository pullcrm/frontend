<template>
  <div class="schedule-page-queue">
    <div class="schedule-page-queue__inner">
      <ScheduleDatePicker
        class="schedule-page-queue__schedule-date-picker"
      />

      <UiTitle
        size="s"
        class="schedule-page-queue__title"
      >
        Очередь
      </UiTitle>

      <Appointment
        v-for="appointment in queue"
        :key="`queue-${appointment.id}`"
        :appointment="appointment"
        class="schedule-page-queue__appointment"
        @open="openAppointment"
      />

      <div
        class="schedule-page-queue__action"
        @click="addAppointment"
      >
        <UiText
          size="l"
          responsive
          left-icon="outlined/note-pencil"
        >
          Добавить в очередь
        </UiText>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Appointment from '~/components/Appointment/Appointment.vue'

import ScheduleDatePicker from './ScheduleDatePicker.vue'

@Component({
  components: {
    Appointment,
    ScheduleDatePicker
  }
})
export default class Queue extends Vue {
  get queue () {
    return this.$typedStore.state.appointments.queue
  }

  addAppointment () {
    this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: {
        type: 'new',
        isQueue: true
      }
    })
  }

  openAppointment (appointment) {
    this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: {
        type: 'edit',
        appointment
      }
    })
  }
}
</script>

<style lang="scss" src="./Queue.scss"></style>
