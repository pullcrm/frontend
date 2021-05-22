<template>
  <div class="procedures-page-group">
    <UiTitle
      tag="a"
      size="s"
      responsive
      right-icon="outlined/pencil-simple"
      href="#"
      class="procedures-page-group__title"
      @click.native.prevent="onEditCategory"
    >
      {{ categoryName }}
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
    procedures: {
      type: Array,
      required: true
    },

    categoryId: {
      type: Number,
      default: null
    }
  },

  components: {
    ProcedureCard
  }
})
export default class ProceduresGroup extends Vue {
  readonly procedures
  readonly categoryId!: number | null

  get category () {
    return this.$typedStore.getters['procedures/categoriesDict'][this.categoryId]
  }

  get categoryName () {
    return this.category?.name ?? 'Без категории'
  }

  async onEditCategory () {
    if (!this.category) return

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
