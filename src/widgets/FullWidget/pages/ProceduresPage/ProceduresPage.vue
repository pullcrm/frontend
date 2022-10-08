<script lang="ts" setup>
import ProcedurePanel from '../../components/ProcedurePanel.vue'
import ProceduresGroup from '../../components/ProceduresGroup.vue'
import { groupByCategory } from '~/logics/procedures'
import dayjs from '~/utils/dayjs'

const route = useRoute()
const router = useRouter()

const widgetStore = useWidgetStore()

const specialist = computed(() => {
  return widgetStore.specialist
})

const categories = computed(() => {
  return widgetStore.categories
})

const canNext = computed(() => {
  // @ts-expect-error
  return route.query.procedureIds?.length > 0
})

const procedures = computed(() => {
  return specialist.value.procedures
})

const items = computed(() => {
  return groupByCategory(procedures.value, categories.value)
    .filter(({ procedures }) => procedures.length > 0)
})

async function onSubmit() {
  await router.push({
    name: 'fullWidgetPickDatePage',
    query: {
      ...route.query,
      date: dayjs(new Date()).format('YYYY-MM-DD'),
    },
  })
}
</script>

<script lang="ts">
export default {
  async preFetch({ currentRoute }: any) {
    const widgetStore = useWidgetStore()

    const specialistId = Number(currentRoute.query.specialistId || 0)

    await Promise.all([
      widgetStore.fetchSpecialist(specialistId),
      widgetStore.fetchCategories(),
    ])
  },
}
</script>

<template>
  <div class="full-widget-procedures-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-procedures-page__title"
    >
      Виберіть послуги
    </UiTitle>

    <ProceduresGroup
      v-for="(item, index) in items"
      :key="`category-${index}`"
      :title="item.categoryTitle"
      class="full-widget-procedures-page__procedures-group"
    >
      <ProcedurePanel
        v-for="procedure in item.procedures"
        :key="`procedure-${procedure.id}`"
        :procedure="procedure"
        class="full-widget-procedures-page__procedure-panel"
      />
    </ProceduresGroup>

    <UiButton
      v-if="canNext"
      size="m"
      theme="blue"
      class="full-widget-procedures-page__button"
      @click="onSubmit"
    >
      Продовжити
    </UiButton>
  </div>
</template>

<style lang="scss" src="./ProceduresPage.scss"></style>
