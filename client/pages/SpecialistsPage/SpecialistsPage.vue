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

    <UiNavigation
      class="specialists-page__navigation"
      :navigation="navigation"
      :value="activeNavigation"
      @input="onNavigation"
    />

    <SortableList
      :items="specialists"
      axis="xy"
      :item-class="[
        'ui-grid-item',
        'ui-grid-item_12',
        'ui-grid-item_tablet_6',
        'ui-grid-item_laptop_3'
      ]"
      use-drag-handle
      class="ui-grid"
      @update="onSort"
    >
      <template #default="{ item }">
        <SpecialistCard
          :specialist="item"
        />
      </template>
    </SortableList>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SPECIALIST, MANAGER, ADMIN } from '~/constants/roles'

import { getRoleNameByAlias } from '~/logics/specialist'

import UiNotificationBadge from '~/ui/NotificationBadge.vue'

import SortableList from '~/components/SortableList/SortableList.vue'

import SpecialistCard from './components/Card.vue'

@Component({
  layout: 'dashboard',

  components: {
    SortableList,
    SpecialistCard,
    UiNotificationBadge
  }
})
export default class Specialists extends Vue {
  get total () {
    return this.$store.getters['specialists/total']
  }

  get activeNavigation () {
    return getRoleNameByAlias(this.$route.query.role) || 'Все'
  }

  get navigation () {
    return [
      { name: 'Все' },
      { name: 'Специалисты', value: SPECIALIST },
      { name: 'Менеджеры', value: MANAGER },
      { name: 'Руководители', value: ADMIN }
    ]
  }

  get specialists () {
    return this.$typedStore.state.specialists.specialists
      .filter(({ role }) => {
        if (!this.$route.query.role) return true

        return role.name === this.$route.query.role
      })
  }

  async add () {
    await this.$typedStore.dispatch('popup/show', 'specialist-new')
  }

  async onNavigation (item) {
    await this.$router.replace({
      query: {
        role: item.value || undefined
      }
    })
  }

  async onSort (items) {
    this.$typedStore.commit('specialists/SET_SPECIALISTS', items)

    const specialists = items.map(({ id }, index) => {
      return {
        id,
        order: index
      }
    })

    await this.$api.specialist.bulk(specialists)
    await this.$typedStore.dispatch('specialists/fetch')
  }
}
</script>

<style lang="scss" src="./SpecialistsPage.scss"></style>
