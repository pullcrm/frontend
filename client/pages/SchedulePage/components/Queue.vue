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

<style lang="scss">
  .schedule-page-queue {
    z-index: 13;
    width: #{$SCHEDULE_ROW_WIDTH + 8px};

    &__inner {
      @include hide-scrollbar;

      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: inherit;
      width: #{$SCHEDULE_ROW_WIDTH + 8px};
      padding: 16px 4px;
      overflow-y: auto;
      background-color: $ui-white;
      box-shadow: -1px 0 0 $ui-black-20;
    }

    &__backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: inherit;
      display: none;
      padding: 8px;
      color: $ui-black-10;
      background: rgba(#000, 0.6);
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

    @media (max-width: $ui-laptop - 1px) {
      width: 0;

      &__backdrop {
        display: block;
      }
    }
  }
</style>
