<template>
  <UiContainer
    class="specialists-page"
  >
    <div class="specialists-page-header">
      <UiNotificationBadge
        class="specialists-page-header__left"
        :count="count"
      >
        <UiTitle
          size="l"
          responsive
        >
          Сотрудники
        </UiTitle>
      </UiNotificationBadge>

      <div class="specialists-page-header__right">
        <!-- <UiInput
          class="specialists-page-header__search"
          value=""
          left-icon="outlined/magnifying-glass"
          placeholder="Поиск по имени или телефону"
        /> -->

        <UiButton
          size="m"
          theme="blue"
          responsive
          right-icon="outlined/plus"
          @click.native="add"
        >
          Добавить сотрудника
        </UiButton>
      </div>
    </div>

    <!-- <UiTabs
      class="specialists-page__tabs"
      :tabs="tabs"
    /> -->

    <SortableList
      class="ui-grid"
      :items="specialists"
      @update="onSort"
    >
      <template #default="{ item }">
        <SortableItem
          :key="`specialist-${item.id}`"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_6',
            'ui-grid-item_laptop_3'
          ]"
          handle-selector="#hand"
        >
          <SpecialistCard
            :specialist="item"
          />
        </SortableItem>
      </template>
    </SortableList>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiNotificationBadge from '~/ui/NotificationBadge.vue'

import SortableList from '~/components/SortableList/SortableList.vue'
import SortableItem from '~/components/SortableList/SortableItem.vue'

import SpecialistCard from './components/Card.vue'

@Component({
  components: {
    SortableList,
    SortableItem,
    SpecialistCard,
    UiNotificationBadge
  }
})
export default class Specialists extends Vue {
  get tabs () {
    return [
      {
        name: 'Все',
        to: this.$route
      },

      {
        name: 'Специалисты',
        to: '/dashboard'
      },

      {
        name: 'Менеджеры',
        to: '/dashboard'
      },

      {
        name: 'Администраторы',
        to: '/dashboard'
      }
    ]
  }

  get specialists () {
    return this.$typedStore.state.specialists.specialists
  }

  get count () {
    return this.specialists.length
  }

  async add () {
    await this.$typedStore.dispatch('popup/show', 'specialist-new')
  }

  async onSort (items) {
    const specialists = items.map(({ id }, index) => {
      return {
        id,
        rate: index
      }
    })

    await this.$api.specialist.bulk(specialists)
    await this.$typedStore.dispatch('specialists/fetch')
  }
}
</script>

<style lang="scss" src="./SpecialistsPage.scss"></style>
