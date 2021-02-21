<template>
  <div class="specialist-appointments-page">
    <Header
      :appointments="filteredAppointments"
    />

    <div
      ref="inner"
      class="specialist-appointments-page__schedule"
    >
      <ScheduleLoader
        v-if="isLoading"
      />

      <ScheduleTimeline
        class="specialist-appointments-page__timeline"
      />

      <ScheduleColumn
        class="specialist-appointments-page__column"
        :time-offs="filteredTimeOffs"
        :specialist="specialist"
        :appointments="filteredAppointments"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ScheduleLoader from '@/components/Schedule/components/Loader.vue'
import ScheduleColumn from '@/components/Schedule/components/Column.vue'
import ScheduleTimeline from '@/components/Schedule/components/Timeline.vue'

import Header from './components/Header.vue'

@Component({
  components: {
    Header,
    ScheduleLoader,
    ScheduleColumn,
    ScheduleTimeline
  },

  props: {
    specialist: {
      type: Object,
      required: true
    }
  },

  provide () {
    return {
      getUiTooltipContainer: () => {
        return this.$refs.inner
      }
    }
  }
})
export default class SpecialistAppointmentsPage extends Vue {
  readonly specialist

  $refs: {
    inner: HTMLElement
  }

  get isLoading () {
    return this.$store.state.schedule.isLoading
  }

  get timeOffs () {
    return this.$store.getters['schedule/normalizeTimeOffs']
  }

  get appointments () {
    return this.$store.state.appointments.appointments
  }

  get filteredTimeOffs () {
    return this.timeOffs.filter(({ specialistId }) => specialistId === this.specialist.id)
  }

  get filteredAppointments () {
    return this.appointments.filter(item => item.specialist.id === this.specialist.id)
  }

  async mounted () {
    await this.$store.dispatch('schedule/fetch')
  }
}
</script>

<style lang="scss" src="./SpecialistAppointmentsPage.scss"></style>
