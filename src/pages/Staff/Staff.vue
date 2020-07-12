<template>
  <UiContainer
    class="staff-page"
  >
    <div class="staff-page__header">
      <UiTitle
        size="l"
      >
        Сотрудники
      </UiTitle>

      <UiButton
        theme="blue"
        size="l"
        @click.native="onSpecialist"
      >
        Добавить сотрудника
      </UiButton>
    </div>

    <div class="ui-grid">
      <UserCard
        v-for="specialist in staff"
        :key="`specialist-${specialist.id}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_4',
          'ui-grid-item_laptop_3',
          'ui-grid-item_desktop_2'
        ]"
        :user="specialist"
        @edit="onEdit(specialist)"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UserCard from './components/Card.vue'

@Component({
  components: {
    UserCard
  }
})
export default class Staff extends Vue {
  tabActive = 'Все'

  readonly tableLabels = [
    {
      name: 'Краткая информация'
    },
    {
      name: 'Статус',
      style: {
        width: '320px'
      }
    },
    {
      name: 'Управление',
      style: {
        width: '140px',
        textAlign: 'right'
      }
    }
  ]

  get staff () {
    return this.$store.state.employee.specialists
  }

  onEdit (user) {
    this.$store.dispatch('popup/show', {
      name: 'specialist-edit',
      props: { user }
    })
  }

  onSpecialist () {
    this.$store.dispatch('popup/show', 'specialist-new')
  }
}
</script>

<style lang="scss" src="./Staff.scss"></style>
