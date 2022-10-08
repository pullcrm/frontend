<script lang="ts" setup>
import CompanyPanel from '../../components/CompanyPanel.vue'
import SpecialistPanel from '../../components/SpecialistPanel.vue'

import InfoPanel from './components/InfoPanel.vue'
import { setTime } from '~/utils/time'
import dayjs from '~/utils/dayjs'
import { api } from '~/boot/api'

const route = useRoute()
const router = useRouter()

const widgetStore = useWidgetStore()
const toastsStore = useToastsStore()

const procedures = ref<any[]>([])

const specialist = computed(() => {
  return widgetStore.specialist
})

const company = computed(() => {
  return widgetStore.company
})

onMounted(async () => {
  procedures.value = specialist.value.procedures

  if (procedures.value.length === 0) {
    procedures.value = await api.public.proceduresByCompanyId({
      companyId: company.value.id,
    })
  }
})

onMounted(async () => {
  procedures.value = specialist.value.procedures

  if (procedures.value.length === 0) {
    procedures.value = await api.public.proceduresByCompanyId({
      companyId: company.value.id,
    })
  }
})

const activeProcedureIds = computed(() => {
  // @ts-expect-error
  return [].concat(route.query.procedureIds ?? []).map(Number)
})

const activeProcedures = computed(() => {
  return procedures.value.filter((item) => {
    return activeProcedureIds.value.includes(item.id)
  })
})

const duration = computed(() => {
  return activeProcedures.value
    .reduce((acc, { duration }) => acc + duration, 0)
})

const date = computed(() => {
  return route.query.date as string
})

const time = computed(() => {
  return route.query.time as string
})

const dateText = computed(() => {
  const _date = setTime(new Date(date.value), time.value)

  // Четверг, 19:00 – 20:00
  return `${dayjs(date.value).format('dddd')}, ${_date.format('HH:mm')} - ${_date.add(duration.value, 'minute').format('HH:mm')}`
})

function onNew() {
  const { href } = router.resolve({
    name: 'fullWidgetSpecialistsPage',
    query: {
      companyId: String(company.value.id),
    },
  })

  window.open(href, '_self')
}

function onAdd() {
  toastsStore.show({
    title: 'Не доступно!',
    type: 'warning',
  })
}
</script>

<script lang="ts">
export default {
  async preFetch({ currentRoute }: any) {
    const widgetStore = useWidgetStore()

    const specialistId = Number(currentRoute.query.specialistId || 0)

    await widgetStore.fetchSpecialist(specialistId)
  },
}
</script>

<template>
  <div class="full-widget-order-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-order-page__title"
    >
      Ваш запис
    </UiTitle>

    <InfoPanel
      :date="dateText"
      :procedures="activeProcedures"
      class="full-widget-order-page__info-panel"
    />

    <SpecialistPanel
      :specialist="specialist"
      class="full-widget-order-page__specialist-panel"
    />

    <CompanyPanel
      :company="company"
      class="full-widget-order-page__company-panel"
    />

    <!-- <UiButton
      size="m"
      theme="blue"
      class="full-widget-order-page__button"
      @click.native="onAdd"
    >
      Додати в календар
    </UiButton> -->

    <UiButton
      size="m"
      theme="info-outlined"
      class="full-widget-order-page__button"
      @click="onNew"
    >
      Записатися ще
    </UiButton>
  </div>
</template>

<style lang="scss" src="./OrderPage.scss"></style>
