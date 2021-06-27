<template>
  <SpecialistLayout
    class="specialist-schedule-page"
  >
    <Header
      :appointments="filteredAppointments"
    />

    <div
      ref="inner"
      class="specialist-schedule-page__schedule"
    >
      <ScheduleLoader
        v-if="isLoading"
      />

      <ScheduleTimeline
        class="specialist-schedule-page__timeline"
      />

      <ScheduleColumn
        class="specialist-schedule-page__column"
        :time-offs="filteredTimeOffs"
        :specialist="specialist"
        :appointments="filteredAppointments"
      />
    </div>
  </SpecialistLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ScheduleLoader from '~/components/Loader.vue'
import ScheduleColumn from '~/components/Schedule/components/Column.vue'
import ScheduleTimeline from '~/components/Schedule/components/Timeline.vue'

import SpecialistLayout from '../components/SpecialistLayout.vue'

import Header from './components/Header.vue'

@Component({
  components: {
    Header,
    ScheduleLoader,
    ScheduleColumn,
    ScheduleTimeline,
    SpecialistLayout
  },

  provide () {
    return {
      getUiTooltipContainer: () => {
        return this.$refs.inner
      }
    }
  },

  async asyncData ({ typedStore, route }) {
    const slug = Number(route.params.slug)

    const specialist = typedStore.getters['specialists/byId'](slug)

    return {
      specialist
    }
  }
})
export default class SpecialistSchedulePage extends Vue {
  readonly specialist

  $refs: {
    inner: HTMLElement
  }

  get isLoading () {
    return this.$typedStore.state.schedule.isLoading
  }

  get timeOffs () {
    return this.$typedStore.getters['schedule/normalizeTimeOffs']
  }

  get appointments () {
    return this.$typedStore.state.appointments.appointments
  }

  get filteredTimeOffs () {
    return this.timeOffs.filter(({ specialistId }) => specialistId === this.specialist.id)
  }

  get filteredAppointments () {
    return this.appointments.filter(item => item.specialist.id === this.specialist.id)
  }

  async mounted () {
    await this.$typedStore.dispatch('schedule/fetch')
  }
}
</script>

<style lang="scss" src="./SpecialistSchedulePage.scss"></style>
