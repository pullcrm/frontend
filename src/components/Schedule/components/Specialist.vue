<script lang="ts" setup>
import { COMPLETED } from '~/constants/appointment'

import { setTime } from '~/utils/time'
import { pluralize } from '~/utils/pluralize'
import { formatMoney } from '~/utils/money'

import { isCloseDay } from '~/logics/time-offs'
import { api } from '~/boot/api'

const props = defineProps({
  specialist: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const scheduleStore = useScheduleStore()
const timetableStore = useTimetableStore()
const appointmentsStore = useAppointmentsStore()

const status = computed(() => {
  return props.specialist.status
})

const user = computed(() => {
  return props.specialist.user
})

const avatar = computed(() => {
  return user.value.avatar?.path
})

const timeOffs = computed(() => {
  return scheduleStore.timeOffs
})

const timeWork = computed(() => {
  return timetableStore.timeWork
})

const isClosedDay = computed(() => {
  return timeOffs.value.some((timeOff) => {
    if (timeOff.specialistId !== props.specialist.id)
      return false

    return isCloseDay(timeOff, timeWork.value)
  })
})

const appointments = computed(() => {
  return appointmentsStore.appointments
    .filter(({ specialist }) => specialist.id === props.specialist.id)
})

const appointmentsCount = computed(() => {
  return appointments.value.length
})

const money = computed(() => {
  return appointments.value
    .filter(({ status }) => status === COMPLETED)
    .reduce((sum, { total }) => (sum + total), 0)
})

async function onCloseDay() {
  const { from, to } = timeWork.value

  const date = new Date(scheduleStore.date)

  const startDateTime = setTime(date, from).format('YYYY-MM-DD HH:mm:ss')
  const endDateTime = setTime(date, to).format('YYYY-MM-DD HH:mm:ss')

  await api.timeOff.create({
    specialistId: props.specialist.id,
    endDateTime,
    startDateTime,
    description: '',
  })

  await scheduleStore.fetchTimeOffs()
}

async function edit() {
  await router.push({
    name: 'specialistInfo',
    params: {
      slug: props.specialist.id,
    },
  })
}
</script>

<template>
  <div
    class="schedule-column-specialist"
    :class="[
      `_status_${status}`,
    ]"
  >
    <UiAvatar
      class="schedule-column-specialist__avatar"
      :image="avatar"
      :name="user.fullName"
      size="s"
    />

    <div class="schedule-column-specialist__info">
      <UiText
        class="schedule-column-specialist__name"
        size="s"
      >
        {{ user.fullName }}
      </UiText>

      <UiText
        class="schedule-column-specialist__total"
        size="s"
      >
        {{ appointmentsCount }}
        {{ pluralize(appointmentsCount, 'клієнт', 'клієнта', 'клієнтів') }}
        <span> - </span>
        {{ formatMoney(money) }}
      </UiText>
    </div>

    <UiDropdownMenu
      placement="bottom_end"
    >
      <template #inner>
        <UiIcon
          class="schedule-column-specialist__icon"
          size="s"
          name="outlined/dots-three-vertical"
        />
      </template>

      <UiDropdownList>
        <UiText
          tag="a"
          href="#"
          size="m"
          left-icon="outlined/pencil"
          @click.prevent="edit"
        >
          Редагувати
        </UiText>

        <UiText
          v-if="isClosedDay === false"
          tag="a"
          href="#"
          size="m"
          left-icon="outlined/prohibit"
          @click.prevent="onCloseDay"
        >
          Закрити запис <br> на цей день
        </UiText>
      </UiDropdownList>
    </UiDropdownMenu>
  </div>
</template>

<style lang="scss">
  .schedule-column-specialist {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    background: $ui-white;

    &._status_DASHBOARD {
      background: #fef0f0;
    }

    &__name {
      font-weight: 500;
    }

    &__total {
      color: $ui-black-80;
    }

    &__info {
      flex: 1;
      margin: 0 8px;
    }

    &__icon {
      cursor: pointer;
    }
  }
</style>
