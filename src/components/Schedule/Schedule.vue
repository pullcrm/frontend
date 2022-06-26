<script lang="ts" setup>
import Timeline from './components/Timeline.vue'
import Specialist from './components/Specialist.vue'
import ActiveTime from './components/ActiveTime.vue'
import ScheduleColumn from './components/Column.vue'
import ScheduleColumnPlaceholder from './components/ColumnPlaceholder.vue'
import Loader from '~/components/Loader.vue'
import dayjs from '~/utils/dayjs'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const inner = ref<HTMLElement | null>(null)

provide('getUiTooltipContainer', () => inner.value)

const scheduleStore = useScheduleStore()
const specialistsStore = useSpecialistsStore()
const appointmentsStore = useAppointmentsStore()

const date = computed(() => {
  return scheduleStore.date
})

const isToday = computed(() => {
  return dayjs(date.value).isToday()
})

const specialists = computed(() => {
  return specialistsStore.specialists
})

const timeOffs = computed(() => {
  return scheduleStore.normalizeTimeOffs
})

const appointments = computed(() => {
  return appointmentsStore.appointments
})

const columns = computed(() => {
  return specialists.value
    .filter(({ status }) => status !== 'HIDE' /* @TODO: Refactor */)
    .map((specialist) => {
      const appointmentsList = appointments.value.filter((item) => {
        return item.specialist.id === specialist.id
      })

      const timeOffsList = timeOffs.value.filter(({ specialistId }: any) => specialistId === specialist.id)

      return {
        timeOffs: timeOffsList,
        specialist,
        appointments: appointmentsList,
      }
    })
})
</script>

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

<style lang="scss" src="./Schedule.scss"></style>
