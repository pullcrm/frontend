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

    <div class="ui-grid">
      <SpecialistCard
        v-for="specialist in specialists"
        :key="`specialist-${specialist.id}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        :specialist="specialist"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiNotificationBadge from '@/ui/NotificationBadge.vue'

import SpecialistCard from './components/Card.vue'

@Component({
  components: {
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
    return this.$store.state.specialists.specialists
  }

  get count () {
    return this.specialists.length
  }

  async add () {
    await this.$store.dispatch('popup/show', 'specialist-new')
  }
}
</script>

<style lang="scss" src="./SpecialistsPage.scss"></style>
