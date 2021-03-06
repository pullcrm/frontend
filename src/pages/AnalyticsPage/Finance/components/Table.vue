<template>
  <UiPanel
    class="analytics-page-finance-table"
    size="s"
  >
    <UiTable
      :data="data"
      numbered
    >
      <template #default="{ row }">
        <UiTableColumn
          name="Название"
          align="left"
        >
          <UiText
            size="m"
            responsive
          >
            {{ row.name }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Цена"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            {{ row.price | price }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Продажи"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            15
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Онлайн"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            15
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Офлайн"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            0
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Доход"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            7 500 грн
          </UiText>
        </UiTableColumn>
      </template>
    </UiTable>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTable from '@/ui/Table/Table.vue'
import UiTableColumn from '@/ui/Table/TableColumn.vue'

@Component({
  components: {
    UiTable,
    UiTableColumn
  },

  props: {
    data: {
      type: Array,
      required: true
    }
  }
})
export default class Table extends Vue {
  readonly data!: any[]
}
</script>

<style lang="scss">
  //
</style>
