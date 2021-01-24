<template>
  <div class="schedule-page-queue">
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

import Appointment from '@/components/Appointment/Appointment.vue'

@Component({
  components: {
    Appointment
  }
})
export default class Queue extends Vue {
  get queue () {
    return this.$store.state.appointments.queue
  }

  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        isQueue: true
      }
    })
  }

  openAppointment (appointment) {
    this.$store.dispatch('popup/show', {
      name: 'appointment-edit',
      props: { appointment }
    })
  }
}
</script>

<style lang="scss">
  .schedule-page-queue {
    width: #{$SCHEDULE_APPOINTMENT_WIDTH + 8px};

    &__inner {
      @include hide-scrollbar;

      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: inherit;
      padding: 16px 4px;
      overflow-y: auto;
      background-color: $ui-white;
      box-shadow: -1px 0 0 $ui-black-20;
    }

    &__action {
      display: flex;
      justify-content: center;
      margin: 8px 6px;
      padding: 28px 0;
      color: $ui-black-60;
      border: 1px dashed $ui-black-40;
      border-radius: 4px;
      cursor: pointer;
    }
  }
</style>
