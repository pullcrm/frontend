<template>
  <div class="schedule-queue">
    <!-- добавить сортировку в выпадающем меню -->
    <UiText
      class="schedule-queue__title"
      right-icon="more/vertical"
      size="m"
    >
      Очередь
    </UiText>

    <div class="schedule-queue__inner">
      <Placeholder />

      <Appointment
        v-for="appointment in queue"
        :key="`queue-${appointment.id}`"
        :appointment="appointment"
        @open="openAppointment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Appointment from '@/components/Appointment/Appointment.vue'

import Placeholder from './Placeholder.vue'

@Component({
  components: {
    Placeholder,
    Appointment
  }
})
export default class Queue extends Vue {
  get queue () {
    return this.$store.state.calendar.queue
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
  .schedule-queue {
    display: flex;
    flex-direction: column;

    &__title {
      margin-bottom: 16px;
      color: $ui-black-80;
      cursor: pointer;
    }

    &__inner {
      flex: 1;
      overflow-y: auto;
      background: #f7f8fb;
      border-radius: 8px;
    }
  }
</style>
