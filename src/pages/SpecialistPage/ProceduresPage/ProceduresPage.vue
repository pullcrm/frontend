<script lang="ts" setup>
import ProceduresGroup from './components/ProceduresGroup.vue'
import { SPECIALIST } from '~/constants/roles'

import { groupByCategory } from '~/logics/procedures'

useMeta({
  title: 'Список послуг фахівця - pullcrm',
})

const popupStore = usePopupStore()
const positionStore = usePositionStore()
const specialistStore = useSpecialistStore()
const proceduresStore = useProceduresStore()

const specialist = computed(() => {
  return specialistStore.specialist
})

const isEditableList = computed(() => {
  return positionStore.role.name !== SPECIALIST
})

const procedures = computed(() => {
  return specialist.value.procedures
})

const categories = computed(() => {
  return proceduresStore.categories
})

const proceduresByCategory = computed(() => {
  return groupByCategory(procedures.value, categories.value)
})

const items = computed(() => {
  return proceduresByCategory.value
    .filter(({ procedures }) => procedures.length > 0)
})

const isEmpty = computed(() => {
  return items.value.length === 0
})

function openPopup() {
  popupStore.show({
    name: 'specialist-procedures',
    props: {
      specialist: specialist.value,
    },
  })
}
</script>

<template>
  <div class="specialist-procedures-page">
    <UiPlaceholder
      v-if="isEmpty"
      title="Список послуг порожній"
      text="Додайте послугу, щоб фахівець розпочав роботу"
      class="specialist-procedures-page__placeholder"
    />

    <ProceduresGroup
      v-for="(item, index) in items"
      :key="index"
      :group="item"
      class="specialist-procedures-page__procedures-group"
    />

    <UiButton
      v-if="isEditableList"
      size="m"
      theme="blue"
      right-icon="outlined/pencil-simple"
      class="specialist-procedures-page__button"
      @click="openPopup"
    >
      Змінити список послуг
    </UiButton>
  </div>
</template>

<style lang="scss" src="./ProceduresPage.scss"></style>
