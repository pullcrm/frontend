<template>
  <div
    class="schedule"
  >
    <UiContainer
      class="schedule__inner"
    >
      <Sidebar
        class="schedule__sidebar"
      />

      <Calendar>
        <template #table:prepend>
          <Loader />
        </template>

        <template #grid>
          <Appointment
            v-for="appointment in appointments"
            :key="`appointment-${appointment.id}`"
            :appointment="appointment"
            @open="openAppointment"
          />

          <TimeOff
            v-for="timeOff in timeOffs"
            :key="`time-off-${timeOff.id}`"
            :item="timeOff"
          />

          <DropPlaceholder />

          <Tile
            v-for="(tile, index) in tiles"
            :key="`tile-${index}`"
            :tile="tile"
            @time-off="addTimeOff"
            @appointment="addAppointment"
          />
        </template>
      </Calendar>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Appointment from '@/components/Appointment/Appointment.vue'
import AppointmentWrap from '@/components/Appointment/Wrap.vue'

import Tile from './components/Calendar/Tile.vue'
import Loader from './components/Calendar/Loader.vue'
import TimeOff from './components/Calendar/TimeOff.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Calendar from './components/Calendar/Calendar.vue'
import DropPlaceholder from './components/Calendar/DropPlaceholder.vue'

@Component({
  components: {
    Tile,
    Loader,
    TimeOff,
    Sidebar,
    Calendar,
    Appointment,
    AppointmentWrap,
    DropPlaceholder
  }
})
export default class Schedule extends Vue {
  get tiles () {
    return this.$store.getters['calendar/gridTiles']
  }

  get appointments () {
    return this.$store.state.calendar.appointments
  }

  get timeOffs () {
    return this.$store.getters['calendar/normalizeTimeOffs']
  }

  async mounted () {
    const { date } = this.$route.query

    if (date) {
      this.$store.commit('calendar/SET_DATE', date)
    }

    await this.$store.dispatch('calendar/fetch')
  }

  addTimeOff ({ employeeId, time }) {
    this.$store.dispatch('popup/show', {
      name: 'time-off-new',
      props: { employeeId, time }
    })
  }

  addAppointment ({ employeeId, time }) {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: { employeeId, time }
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
  .schedule {
    padding-bottom: 32px;

    &__title {
      margin-top: 8px;
      margin-bottom: 32px;
    }

    &__sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 64px;
      z-index: 10;
      width: calc(#{$SCHEDULE_APPOINTMENT_WIDTH} + 26px);
    }
  }
</style>
