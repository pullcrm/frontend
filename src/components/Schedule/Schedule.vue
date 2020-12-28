<template>
  <div class="schedule">
    <Timeline
      class="schedule__timeline"
    />

    <div class="schedule__table">
      <Loader
        v-if="loading"
      />

      <div class="schedule__columns">
        <ScheduleColumn
          v-for="(column, index) in columns"
          :key="`column-${index}`"
          :time-offs="column.timeOffs"
          :specialist="column.specialist"
          :appointments="column.appointments"
        />

        <ScheduleColumnPlaceholder />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Loader from './components/Loader.vue'
import Timeline from './components/Timeline.vue'
import ScheduleColumn from './components/Column.vue'
import ScheduleColumnPlaceholder from './components/ColumnPlaceholder.vue'

@Component({
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Loader,
    Timeline,
    ScheduleColumn,
    ScheduleColumnPlaceholder
  }
})
export default class Schedule extends Vue {
  readonly loading: boolean

  get specialists () {
    return this.$store.state.specialists.specialists
  }

  get timeOffs () {
    return this.$store.getters['schedule/normalizeTimeOffs']
  }

  get appointments () {
    return this.$store.state.appointments.appointments
  }

  get columns () {
    return this.specialists.map(specialist => {
      const appointments = this.appointments.filter(({ employee }) => {
        return employee.id === specialist.id
      })

      const timeOffs = this.timeOffs.filter(({ employeeId }) => employeeId === specialist.id)

      return {
        timeOffs,
        specialist,
        appointments
      }
    })
  }
}
</script>

<style lang="scss" src="./Schedule.scss"></style>
