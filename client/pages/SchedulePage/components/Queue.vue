<template>
  <div class="schedule-page-queue">
    <div
      class="schedule-page-queue__backdrop"
      @click="closeQueue"
    >
      <UiIcon
        name="outlined/x"
        size="s"
      />
    </div>

    <div class="schedule-page-queue__inner">
      <Appointment
        v-for="appointment in queue"
        :key="`queue-${appointment.id}`"
        :appointment="appointment"
        @open="openAppointment"
      />

      <div
        class="schedule-page-queue__action"
        @click="addAppointment"
      >
        <UiText
          size="m"
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

@Component({
  components: {
    Appointment
  }
})
export default class Queue extends Vue {
  get queue () {
    return this.$typedStore.state.appointments.queue
  }

  closeQueue () {
    this.$typedStore.commit('schedule/SET_QUEUE_OPEN', false)
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
