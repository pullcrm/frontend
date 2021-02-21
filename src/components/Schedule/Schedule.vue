<template>
  <div class="schedule">
    <Timeline
      class="schedule__timeline"
    />

    <ActiveTime
      v-if="isToday"
    />

    <div
      ref="inner"
      class="schedule__inner"
    >
      <Loader
        v-if="loading"
      />

      <div class="schedule__columns">
        <ScheduleColumn
          v-for="(column, index) in columns"
          :key="`column-${index}`"
          class="schedule__column"
          :time-offs="column.timeOffs"
          :specialist="column.specialist"
          :appointments="column.appointments"
        >
          <template #append>
            <Specialist
              class="schedule__specialist"
              :specialist="column.specialist"
            />
          </template>
        </ScheduleColumn>

        <ScheduleColumnPlaceholder />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

import Loader from './components/Loader.vue'
import Timeline from './components/Timeline.vue'
import Specialist from './components/Specialist.vue'
import ActiveTime from './components/ActiveTime.vue'
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
    Specialist,
    ActiveTime,
    ScheduleColumn,
    ScheduleColumnPlaceholder
  },

  provide () {
    return {
      getUiTooltipContainer: () => {
        return this.$refs.inner
      }
    }
  }
})
export default class Schedule extends Vue {
  readonly loading: boolean

  $refs: {
    inner: HTMLElement
  }

  get date () {
    return this.$store.state.schedule.date
  }

  get isToday () {
    return dayjs(this.date).isToday()
  }

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
    return this.specialists
      .filter(({ status }) => status !== 'HIDE' /* @TODO: Refactor */)
      .map(specialist => {
        const appointments = this.appointments.filter(item => {
          return item.specialist.id === specialist.id
        })

        const timeOffs = this.timeOffs.filter(({ specialistId }) => specialistId === specialist.id)

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
