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
          @click.native="add"
        >
          Добавити співробітника
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
        'ui-grid-item_laptop_4',
        'ui-grid-item_desktop_3'
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
  },

  head () {
    return {
      title: 'Список співробітників - pullcrm'
    }
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
      { name: 'Всі' },
      { name: 'Спеціалісти', value: SPECIALIST },
      { name: 'Менеджери', value: MANAGER },
      { name: 'Керівники', value: ADMIN }
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
