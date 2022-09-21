<script lang="ts" setup>
import Header from './components/Header.vue'
import ScheduleLoader from '~/components/Loader.vue'
import ScheduleColumn from '~/components/Schedule/components/Column.vue'
import ScheduleTimeline from '~/components/Schedule/components/Timeline.vue'

useMeta({
  title: 'Календар спеціаліста - pullcrm',
})

const inner = ref<HTMLElement | null>(null)

const scheduleStore = useScheduleStore()
const specialistStore = useSpecialistStore()
const appointmentsStore = useAppointmentsStore()

provide('getUiTooltipContainer', () => inner.value)

const specialist = computed(() => {
  return specialistStore.specialist
})

const isLoading = computed(() => {
  return scheduleStore.isLoading
})

const timeOffs = computed(() => {
  return scheduleStore.normalizeTimeOffs
})

const appointments = computed(() => {
  return appointmentsStore.appointments
})

const filteredTimeOffs = computed(() => {
  return timeOffs.value.filter(({ specialistId }: any) => specialistId === specialist.value.id)
})

const filteredAppointments = computed(() => {
  return appointments.value.filter(item => item.specialist.id === specialist.value.id)
})

onMounted(async () => {
  await scheduleStore.fetch()
})
</script>

<template>
  <div class="specialist-schedule-page">
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
  </div>
</template>

<style lang="scss" src="./SchedulePage.scss"></style>
