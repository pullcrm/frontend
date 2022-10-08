<script lang="ts" setup>
import Layout from '../../components/Layout.vue'
import DatePicker from '../../components/DatePicker/DatePicker.vue'

import TimePicker from './components/TimePicker/TimePicker.vue'
import SpecialistPanel from './components/SpecialistPanel.vue'
// eslint-disable-next-line import/no-duplicates
import dayjs from '~/utils/dayjs'
import { api } from '~/boot/api'

const route = useRoute()
const router = useRouter()

const widgetStore = useWidgetStore()

const specialist = computed(() => {
  return widgetStore.specialist
})

onMounted(async () => {
  await fetch()
})

const availableHours = ref([])

const fromDatePick = ref(new Date())

const date = computed(() => {
  return route.query.date
})

const time = computed(() => {
  return route.query.time
})

const isToday = computed(() => {
  return dayjs(String(date.value)).isToday()
})

const procedures = computed(() => {
  return specialist.value.procedures
})

const canNext = computed(() => {
  return date.value && time.value
})

const activeProcedureIds = computed(() => {
  return [].concat(route.query.procedureIds ?? []).map(Number)
})

const activeProcedures = computed(() => {
  return procedures.value.filter((item: any) => {
    return activeProcedureIds.value.includes(item.id)
  })
})

const duration = computed(() => {
  return activeProcedures.value
    .reduce((acc: number, { duration }: any) => acc + duration, 0)
})

async function onSubmit() {
  await router.push({
    name: 'fullWidgetConfirmationPage',
    query: route.query,
  })
}

async function fetch() {
  const date = route.query.date
  const companyId = Number(route.query.companyId || 0)
  const specialistId = Number(route.query.specialistId || 0)

  availableHours.value = await api.public.hoursSlots({
    date,
    duration: duration.value,
    companyId,
    specialistId,
  }).then((result) => {
    return result.map((item: any) => {
      const [hour, minute] = item.split(':').map(Number)

      return (new Date()).setHours(hour, minute, 0)
    })
  }).then((result) => {
    return result.filter((item: any) => {
      if (!isToday.value)
        return true

      return dayjs(item).isAfter(dayjs())
    })
  })
}

provide('duration', () => duration.value)

watch(
  () => date.value,
  () => fetch(),
)
</script>

<script lang="ts">
/* eslint-disable import/first */
// eslint-disable-next-line import/no-duplicates
import dayjs2 from '~/utils/dayjs'

export default {
  async preFetch({ currentRoute, redirect }: any) {
    const { date } = currentRoute.query

    if (
      Boolean(date) === false
      || dayjs2(String(date)).isBefore(dayjs2(new Date()), 'day')
    ) {
      redirect({
        ...route,
        query: {
          ...route.query,
          date: dayjs2(new Date()).format('YYYY-MM-DD'),
        },
      })
    }

    const widgetStore = useWidgetStore()

    const specialistId = Number(currentRoute.query.specialistId || 0)

    await widgetStore.fetchSpecialist(specialistId)
  },
}
</script>

<template>
  <div class="full-widget-pick-date-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-pick-date-page__title"
    >
      Виберіть час
    </UiTitle>

    <DatePicker
      :date="fromDatePick"
      :days-count="12"
      class="full-widget-pick-date-page__date-picker"
    />

    <SpecialistPanel
      :specialist="specialist"
      :procedures="activeProcedures"
      class="full-widget-pick-date-page__specialist-panel"
    />

    <TimePicker
      :hours="availableHours"
    />

    <UiButton
      v-if="canNext"
      size="m"
      theme="blue"
      class="full-widget-pick-date-page__button"
      @click="onSubmit"
    >
      Продовжити
    </UiButton>
  </div>
</template>

<style lang="scss" src="./PickDatePage.scss"></style>
