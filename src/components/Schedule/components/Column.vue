<script lang="ts" setup>
import TimeOff from './TimeOff.vue'
import HourTile from './HourTile.vue'
import AvailableArea from './AvailableArea.vue'
import TimetablePlaceholder from './TimetablePlaceholder.vue'

import { SCHEDULE_APPOINTMENT_HEIGHT } from '~/constants'

import { getWorkingHours, slugFromTime } from '~/utils/time'

import type PopperMenu from '~/components/PopperMenu/PopperMenu.vue'
import Appointment from '~/components/Appointment/Appointment.vue'

interface IProps {
  specialist: any
  appointments: any[]
  timeOffs: any[]
}

const props = defineProps<IProps>()

const hourTile = ref<typeof HourTile | null>(null)
const hoveredTime = ref<string | null>(null)

const getPopperMenu = inject<() => typeof PopperMenu>('getPopperMenu')

const popupStore = usePopupStore()
const scheduleStore = useScheduleStore()
const timetableStore = useTimetableStore()

const date = computed(() => {
  return scheduleStore.date
})

const timetable = computed(() => {
  // @ts-expect-error
  const timetables = timetableStore.timetableDict[props.specialist.id] || {}

  return timetables[date.value]
})

const timetableData = computed(() => {
  const result = {
    hasTimetable: false,
    // TODO: Change this code
    times: getWorkingHours('09:00', '20:00'),
  }

  if (timetable.value) {
    const { start, end } = timetable.value

    result.hasTimetable = true
    result.times = getWorkingHours(start, end)
  }

  return result
})

const workingHours = computed(() => {
  return timetableStore.maxWorkingHours
})

const gridStyles = computed(() => {
  const templateRows = workingHours.value.map((hour, index) => {
    hour = slugFromTime(hour)

    if (index === workingHours.value.length - 1)
      return `[${hour}-start] 0px [${hour}-end] 0`

    return `[${hour}-start] ${SCHEDULE_APPOINTMENT_HEIGHT}px [${hour}-end] 0`
  }).join(' ')

  return {
    gridTemplateColumns: '[start] 100% [end] 0',
    gridTemplateRows: templateRows,
  }
})

function openMenu() {
  if (!hoveredTime.value || !getPopperMenu)
    return

  const popperMenu = getPopperMenu()

  if (popperMenu.reference === hourTile.value?.icon)
    return

  const onAddAppointment = {
    name: 'Додати запис',
    icon: 'outlined/plus-circle',
    click: addAppointment,
  }

  const onAddTimeOff = {
    name: 'Додати перерву',
    icon: 'outlined/prohibit',
    click: addTimeOff,
  }

  popperMenu.open(hourTile.value?.icon, {
    name: `Початок: ${hoveredTime.value}`,
    options: [
      onAddAppointment,
      onAddTimeOff,
    ],
    placement: 'right',
  })
}

function addAppointment() {
  if (!hoveredTime.value)
    return

  popupStore.show({
    name: 'appointment',
    props: {
      type: 'new',
      time: hoveredTime.value,
      specialistId: props.specialist.id,
    },
  })
}

function addTimeOff() {
  popupStore.show({
    name: 'time-off-new',
    props: {
      time: hoveredTime.value,
      specialistId: props.specialist.id,
    },
  })
}

function addTimetable() {
  popupStore.show({
    name: 'timetable-new',
    props: {
      dates: [new Date(scheduleStore.date)],
      specialistId: props.specialist.id,
    },
  })
}

function onMousemove(event: any) {
  if (!getPopperMenu)
    return

  const index = Math.floor(event.offsetY / SCHEDULE_APPOINTMENT_HEIGHT)

  if (event.offsetY > 0 && timetableData.value.times[index] !== hoveredTime.value) {
    getPopperMenu().close()

    hoveredTime.value = timetableData.value.times[index]
  }
}

function onMouseleave() {
  if (!getPopperMenu)
    return

  if (getPopperMenu().isOpened)
    return

  hoveredTime.value = null
}
</script>

<template>
  <div class="schedule-column">
    <slot name="append" />

    <div
      class="schedule-column__grid"
      :style="gridStyles"
    >
      <Appointment
        v-for="appointment in appointments"
        :key="`appointment-${appointment.id}`"
        responsive
        :appointment="appointment"
      />

      <TimeOff
        v-for="timeOff in timeOffs"
        :key="`time-off-${timeOff.id}`"
        :time-off="timeOff"
      />

      <HourTile
        v-if="hoveredTime"
        ref="hourTile"
        :time="hoveredTime"
        :specialist="specialist"
        class="schedule-column__hour-tile"
      />

      <TimetablePlaceholder
        v-if="!timetableData.hasTimetable"
        @add="addTimetable"
      />

      <AvailableArea
        :working-hours="timetableData.times"
        @click="openMenu"
        @dblclick="addAppointment"
        @mousemove="onMousemove"
        @mouseleave="onMouseleave"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./Column.scss"></style>
