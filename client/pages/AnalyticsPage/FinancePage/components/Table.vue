<template>
  <UiPanel
    v-if="list.length > 0"
    class="analytics-finance-page-table"
    size="s"
  >
    <UiTable
      :data="list"
      numbered
    >
      <template #default="{ row }">
        <UiTableColumn
          name="Назва"
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
          name="Ціна"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            {{ row.avgPrice | price }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Продажі"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            {{ row.total }}
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
            {{ row.online }}
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
            {{ row.offline }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          name="Дохід"
          align="center"
        >
          <UiText
            size="m"
            responsive
          >
            {{ row.income | price }}
          </UiText>
        </UiTableColumn>
      </template>
    </UiTable>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTable from '~/ui/Table/Table.vue'
import UiTableColumn from '~/ui/Table/TableColumn.vue'

@Component({
  components: {
    UiTable,
    UiTableColumn
  }
})
export default class FinanceTable extends Vue {
  get financeStats () {
    return this.$typedStore.state.analytics.financeStats
  }

  get list () {
    return this.financeStats.procedures
  }
}
</script>

<style lang="scss">
  //
</style>
