<template>
  <div class="procedures-page-group">
    <UiText
      size="l"
      strong
      responsive
      class="procedures-page-group__title"
      @click.native="onEditCategory"
    >
      {{ categoryName }}
    </UiText>

    <UiPanel
      size="s"
    >
      <UiTable
        v-if="procedures.length > 0"
        :data="procedures"
        numbered
      >
        <template #default="{ row }">
          <UiTableColumn
            name="Название"
            align="left"
          >
            {{ row.name }}
          </UiTableColumn>

          <UiTableColumn name="Описание">
            <UiText
              size="s"
            >
              {{ row.description }}
            </UiText>
          </UiTableColumn>

          <UiTableColumn name="Цена">
            <UiPrice
              size="xs"
              responsive
            >
              {{ row.price | price }}
            </UiPrice>
          </UiTableColumn>

          <UiTableColumn name="Длительность">
            {{ row.duration | minutesToTime }}
          </UiTableColumn>

          <UiTableColumn name="Изменить">
            <UiButton
              theme="info-outlined"
              left-icon="outlined/pencil"
              size="s"
              @click.native="onEdit(row)"
            >
              Открыть
            </UiButton>
          </UiTableColumn>
        </template>
      </UiTable>

      <UiText
        v-else
        size="m"
        responsive
      >
        В этой категории еще ничего нет
      </UiText>
    </UiPanel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTable from '~/ui/Table/Table.vue'
import UiTableColumn from '~/ui/Table/TableColumn.vue'

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
    UiTable,
    UiTableColumn
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

  async onEdit (procedure) {
    await this.$typedStore.dispatch('popup/show', {
      name: 'edit-procedure',
      props: { procedure }
    })
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
}
</script>

<style lang="scss">
.procedures-page-group {
  &__title {
    margin-bottom: 16px;
  }
}
</style>
