<script lang="ts" setup>
import SpecialistCard from './components/Card.vue'
import { ADMIN, MANAGER, SPECIALIST } from '~/constants/roles'

import { getRoleNameByAlias } from '~/logics/specialist'

import SortableList from '~/components/SortableList/SortableList.vue'
import { api } from '~/boot/api'

useMeta({
  title: 'Список співробітників - pullcrm',
})

const route = useRoute()
const router = useRouter()

const popupStore = usePopupStore()
const specialistsStore = useSpecialistsStore()

const total = computed(() => {
  return specialistsStore.total
})

const activeNavigation = computed(() => {
  return getRoleNameByAlias(route.query.role as string) || 'Все'
})

const navigation = computed(() => {
  return [
    { name: 'Всі' },
    { name: 'Спеціалісти', value: SPECIALIST },
    { name: 'Менеджери', value: MANAGER },
    { name: 'Керівники', value: ADMIN },
  ]
})

const specialists = computed(() => {
  return specialistsStore.specialists
    .filter(({ role }) => {
      if (!route.query.role)
        return true

      return role.name === route.query.role
    })
})

async function add() {
  await popupStore.show('specialist-new')
}

async function onNavigation(item: any) {
  await router.replace({
    query: {
      role: item.value || undefined,
    },
  })
}

async function onSort(items: any) {
  specialistsStore.specialists = items

  const specialists = items.map(({ id }: any, index: number) => {
    return {
      id,
      order: index,
    }
  })

  await api.specialist.bulk(specialists)
  await specialistsStore.fetch()
}
</script>

<template>
  <UiContainer
    class="specialists-page"
  >
    <div class="specialists-page-header">
      <UiNotificationBadge
        class="specialists-page-header__left"
        :count="total"
      >
        <UiTitle
          size="l"
          responsive
        >
          Співробітники
        </UiTitle>
      </UiNotificationBadge>

      <div class="specialists-page-header__right">
        <!-- <UiInput
          class="specialists-page-header__search"
          value=""
          left-icon="outlined/magnifying-glass"
          placeholder="Пошук по імені або телефону"
        /> -->

        <UiButton
          size="m"
          theme="blue"
          responsive
          right-icon="outlined/plus"
          @click="add"
        >
          Додати співробітника
        </UiButton>
      </div>
    </div>

    <UiNavigation
      class="specialists-page__navigation"
      :navigation="navigation"
      :value="activeNavigation"
      @input="onNavigation"
    />

    <SortableList
      :list="specialists"
      axis="xy"
      :item-class="[
        'ui-grid-item',
        'ui-grid-item_12',
        'ui-grid-item_tablet_6',
        'ui-grid-item_laptop_4',
        'ui-grid-item_desktop_3',
      ]"
      use-drag-handle
      class="ui-grid"
      @update:list="onSort"
    >
      <template #default="{ item }: any">
        <SpecialistCard
          :specialist="item"
        />
      </template>
    </SortableList>
  </UiContainer>
</template>

<style lang="scss" src="./SpecialistsPage.scss"></style>
