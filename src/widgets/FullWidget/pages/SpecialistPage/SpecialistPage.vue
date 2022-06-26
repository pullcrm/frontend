<script lang="ts" setup>
import ProcedurePanel from '../../components/ProcedurePanel.vue'
import ProceduresGroup from '../../components/ProceduresGroup.vue'
import { groupByCategory } from '~/logics/procedures'
import dayjs from '~/utils/dayjs'
import { api } from '~/boot/api'

const route = useRoute()
const router = useRouter()

const widgetStore = useWidgetStore()

const specialist = computed(() => {
  return widgetStore.specialist
})

const categories = computed(() => {
  return widgetStore.categories
})

const user = computed(() => {
  return specialist.value.user
})

const avatar = computed(() => {
  return specialist.value.user.avatar?.path
})

const fullName = computed(() => {
  return user.value.fullName
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
  <div class="full-widget-specialist-page">
    <UiAvatar
      :image="avatar"
      :name="fullName"
      size="l"
      class="full-widget-specialist-page__avatar"
    />

    <UiTitle
      size="s"
      class="full-widget-specialist-page__name"
    >
      {{ fullName }}
    </UiTitle>

    <UiText
      size="m"
      class="full-widget-specialist-page__specialization"
    >
      {{ specialist.specialization }}
    </UiText>

    <UiDivider />

    <ProceduresGroup
      v-for="(item, index) in items"
      :key="`category-${index}`"
      :title="item.categoryTitle"
      class="full-widget-specialist-page__procedures-group"
    >
      <ProcedurePanel
        v-for="procedure in item.procedures"
        :key="`procedure-${procedure.id}`"
        :procedure="procedure"
        class="full-widget-specialist-page__procedure-panel"
      />
    </ProceduresGroup>

    <UiButton
      v-if="canNext"
      size="m"
      theme="blue"
      class="full-widget-specialist-page__button"
      @click="onSubmit"
    >
      Продовжити
    </UiButton>
  </div>
</template>

<style lang="scss" src="./SpecialistPage.scss"></style>
