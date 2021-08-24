<template>
  <div
    :class="[
      'procedures-page-group',
      {'procedures-page-group_has-category-id': categoryId > 0}
    ]"
  >
    <UiTitle
      size="s"
      responsive
      right-icon="outlined/pencil-simple"
      class="procedures-page-group__title"
      @click.native.prevent="onEditCategory"
    >
      {{ categoryTitle }}
    </UiTitle>

    <SortableList
      v-if="procedures.length > 0"
      :items="procedures"
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IGroupItem } from '~/logics/procedures'

import SortableList from '~/components/SortableList/SortableList.vue'

import Placeholder from './Placeholder.vue'
import ProcedureCard from './ProcedureCard.vue'

@Component({
  props: {
    group: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    }
  },

  components: {
    Placeholder,
    SortableList,
    ProcedureCard
  }
})
export default class ProceduresGroup extends Vue {
  readonly group!: IGroupItem
  readonly index!: number

  get procedures () {
    return this.group.procedures
  }

  get category () {
    return this.group.category
  }

  get categoryId () {
    return this.category?.id ?? 0
  }

  get categoryTitle () {
    return this.group.categoryTitle
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

  async onSort (items) {
    this.$typedStore.commit('procedures/SET_GROUPED_BY_INDEX', {
      index: this.index,
      procedures: items
    })

    const procedures = items.map(({ id }, index) => {
      return {
        id,
        order: index
      }
    })

    await this.$api.procedures.bulk(procedures)
    await this.$typedStore.dispatch('procedures/fetch')
  }
}
</script>

<style lang="scss" src="./Group.scss"></style>
