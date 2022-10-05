<script lang="ts" setup>
import { SOURCE_WIDGET } from '~/constants'
import { CANCELED, COMPLETED, IN_PROGRESS, IN_QUEUE } from '~/constants/appointment'
import { slugFromTime } from '~/utils/time'

import { getAppointmentSubtitle, getProceduresDuration, sourcesDict, statusesDict } from '~/logics/appointment'

import type PopperMenu from '~/components/PopperMenu/PopperMenu.vue'
import type Badge from '~/ui/Badge/Badge.vue'
import { api } from '~/boot/api'
import { formatMoney } from '~/utils/money'

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },

  responsive: {
    type: Boolean,
    default: false,
  },
})

const getPopperMenu = inject<() => typeof PopperMenu>('getPopperMenu')

const popupStore = usePopupStore()
const toastsStore = useToastsStore()
const scheduleStore = useScheduleStore()

const root = ref<HTMLElement | null>(null)
const statusBadge = ref<typeof Badge | null>(null)

const isActive = ref(false)

// $refs: {
//   status: HTMLElement
// }

const status = computed(() => {
  // @TODO: Refactor
  const { status, source } = props.appointment

  if (source === SOURCE_WIDGET && status === IN_PROGRESS)
    return 'IN_PROGRESS_WIDGET'

  return status
})

const statusName = computed(() => {
  return statusesDict[props.appointment.status as keyof typeof statusesDict]
})

const sourceName = computed(() => {
  return sourcesDict[props.appointment.source as keyof typeof sourcesDict]
})

const subTitle = computed(() => {
  return getAppointmentSubtitle(props.appointment)
})

const totalTime = computed(() => {
  return getProceduresDuration(props.appointment)
})

const sizeName = computed(() => {
  if (totalTime.value < 30)
    return 'xs'
  if (totalTime.value < 45)
    return 's'
  if (totalTime.value < 60)
    return 'm'
  if (totalTime.value < 75)
    return 'l'

  return 'xl'
})

const startTime = computed(() => {
  return props.appointment.startTime
})

const endTime = computed(() => {
  return props.appointment.endTime
})

const gridArea = computed(() => {
  if (props.appointment.status === IN_QUEUE)
    return

  return {
    gridRow: `${slugFromTime(startTime.value)}-start / ${slugFromTime(endTime.value)}-start`,
    gridColumn: 'start / end',
  }
})

function openMenu() {
  if (!getPopperMenu)
    return

  const popperMenu = getPopperMenu()

  if (popperMenu.reference === statusBadge.value?.root)
    return

  if (props.appointment.status === IN_QUEUE)
    return

  const onEdit = {
    name: 'Редагувати',
    icon: 'outlined/pencil',
    click: () => edit(),
  }

  const onStatuses = [IN_PROGRESS, COMPLETED, CANCELED].map(status => ({
    name: statusesDict[status as keyof typeof statusesDict],
    icon: status === props.appointment.status ? 'outlined/check' : 'outlined/minus',
    click: () => onUpdateStatus(status),
  }))

  popperMenu.open(statusBadge.value?.root, {
    options: [
      onEdit,
      ...onStatuses,
    ],
    placement: 'bottom_start',
  })
}

async function onUpdateStatus(status: string) {
  await api.appointments.updateStatus(props.appointment.id, {
    status,
  })

  await toastsStore.show({
    title: 'Виконано',
  })

  await scheduleStore.fetch()
}

function edit() {
  popupStore.show({
    name: 'appointment',
    props: {
      type: 'edit',
      appointment: props.appointment,
    },
  })
}

onClickOutside(root, () => {
  if (isActive.value)
    isActive.value = false
})
</script>

<template>
  <a
    ref="root"
    href="#"
    class="appointment" :class="[
      `appointment_size_${sizeName}`,
      `appointment_status_${status}`,
      { 'appointment_is-active': isActive },
      { 'appointment_responsive': responsive },
    ]"
    :style="gridArea"
    @dblclick.prevent="edit"
    @click.prevent="isActive = true"
  >
    <div class="appointment__divider" />

    <div class="appointment__inner">
      <div class="appointment__header">
        <UiBadge
          ref="statusBadge"
          size="m"
          theme="custom"
          clickable
          @click="openMenu"
        >
          {{ statusName }}
        </UiBadge>

        <UiText
          size="s"
          class="appointment__type"
        >
          <!-- TODO: Add source -->
          {{ sourceName }}
        </UiText>
      </div>

      <div class="appointment__title">
        {{ appointment.fullName }}
      </div>

      <UiText
        class="appointment__sub-title"
        size="s"
      >
        {{ subTitle }}
      </UiText>

      <div class="appointment__space" />

      <div class="appointment__footer">
        <UiText
          v-if="startTime"
          size="s"
          left-icon="outlined/clock"
          class="appointment__duration"
        >
          {{ startTime }} - {{ endTime }}
        </UiText>

        <div class="appointment__price">
          {{ formatMoney(appointment.total) }}
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" src="./Appointment.scss"></style>
