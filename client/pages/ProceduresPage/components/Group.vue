<template>
  <div
    :class="[
      'procedures-page-group',
      {'procedures-page-group_has-category-id': categoryId}
    ]"
  >
    <UiTitle
      size="s"
      responsive
      right-icon="outlined/pencil-simple"
      class="procedures-page-group__title"
      @click.native.prevent="onEditCategory"
    >
      {{ category.name }}
    </UiTitle>

    <div class="procedures-page-group__grid ui-grid">
      <ProcedureCard
        v-for="procedure in procedures"
        :key="procedure.id"
        :procedure="procedure"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
      />

      <UiPanel
        v-if="procedures.length === 0"
        tag="a"
        size="s"
        href="#"
        class="procedures-page-group__placeholder"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        @click.native.prevent="onAdd"
      >
        <UiText
          size="m"
          right-icon="outlined/plus"
          responsive
        >
          Добавить услугу
        </UiText>
      </UiPanel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ProcedureCard from './ProcedureCard.vue'

@Component({
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  components: {
    ProcedureCard
  }
})
export default class ProceduresGroup extends Vue {
  readonly category

  get categoryId () {
    return this.category.id
  }

  get procedures () {
    return this.category.procedures
  }

  async onEditCategory () {
    if (!this.categoryId) return

    await this.$typedStore.dispatch('popup/show', {
      name: 'edit-procedure-category',
      props: {
        category: this.category
      }
    })
  }

  async onAdd () {
    await this.$typedStore.dispatch('popup/show', {
      name: 'new-procedure',
      props: {
        category: this.category
      }
    })
  }
}
</script>

<style lang="scss" src="./Group.scss"></style>
