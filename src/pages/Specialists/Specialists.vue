<template>
  <UiContainer
    class="specialists-page"
  >
    <div class="specialists-page__header">
      <UiTitle
        size="l"
        responsive
      >
        Сотрудники
      </UiTitle>

      <UiButton
        size="l"
        theme="blue"
        responsive
        @click.native="onSpecialist"
      >
        Добавить сотрудника
      </UiButton>
    </div>

    <div class="ui-grid">
      <SpecialistCard
        v-for="specialist in specialists"
        :key="`specialist-${specialist.id}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3',
          'ui-grid-item_desktop_2'
        ]"
        :specialist="specialist"
        @edit="onEdit(specialist)"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import SpecialistCard from './components/Card.vue'

@Component({
  components: {
    SpecialistCard
  }
})
export default class Specialists extends Vue {
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

  get specialists () {
    return this.$store.state.specialists.specialists
  }

  onEdit (specialist) {
    this.$store.dispatch('popup/show', {
      name: 'specialist-edit',
      props: { user: specialist }
    })
  }

  onSpecialist () {
    this.$store.dispatch('popup/show', 'specialist-new')
  }
}
</script>

<style lang="scss" src="./Specialists.scss"></style>
