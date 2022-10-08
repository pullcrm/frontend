<script lang="ts" setup>
import Placeholder from './Placeholder.vue'
import ProcedureCard from './ProcedureCard.vue'
import type { IGroupItem } from '~/logics/procedures'
import { api } from '~/boot/api'

import SortableList from '~/components/SortableList/SortableList.vue'

interface IProps {
  group: IGroupItem
  index: number
}

const props = defineProps<IProps>()

const popupStore = usePopupStore()
const proceduresStore = useProceduresStore()

const procedures = computed(() => {
  return props.group.procedures
})

const category = computed(() => {
  return props.group.category
})

const categoryId = computed(() => {
  return category.value?.id ?? 0
})

const categoryTitle = computed(() => {
  return props.group.categoryTitle
})

async function onEditCategory() {
  if (!categoryId.value)
    return

  await popupStore.show({
    name: 'edit-procedure-category',
    props: {
      category: category.value,
    },
  })
}

async function onSort(items: any) {
  proceduresStore.updateGroupByIndex({
    index: props.index,
    procedures: items,
  })

  const procedures = items.map(({ id }: any, index: number) => {
    return {
      id,
      order: index,
    }
  })

  await api.procedures.bulk(procedures)
  await proceduresStore.fetch()
}
</script>

<template>
  <div
    :class="[
      'procedures-page-group',
      { 'procedures-page-group_has-category-id': categoryId > 0 },
    ]"
  >
    <UiTitle
      size="s"
      responsive
      right-icon="outlined/pencil-simple"
      class="procedures-page-group__title"
      @click.prevent="onEditCategory"
    >
      {{ categoryTitle }}
    </UiTitle>

    <SortableList
      v-if="procedures.length > 0"
      :list="procedures"
      axis="xy"
      :item-class="[
        'ui-grid-item',
        'ui-grid-item_12',
        'ui-grid-item_tablet_6',
        'ui-grid-item_laptop_3',
      ]"
      use-drag-handle
      class="ui-grid"
      @update:list="onSort"
    >
      <template #default="{ item }: any">
        <ProcedureCard
          :procedure="item"
        />
      </template>
    </SortableList>

    <Placeholder
      v-else
      :category="category"
      class="procedures-page-group__placeholder"
    />
  </div>
</template>

<style lang="scss" src="./Group.scss"></style>
