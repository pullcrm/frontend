<script lang="ts" setup>
import { formatMoney } from '~/utils/money'

const analyticsStore = useAnalyticsStore()

const financeStats = computed(() => {
  return analyticsStore.financeStats
})

const list = computed(() => {
  return financeStats.value.procedures
})
</script>

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
            {{ formatMoney(row.avgPrice) }}
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
            {{ formatMoney(row.income) }}
          </UiText>
        </UiTableColumn>
      </template>
    </UiTable>
  </UiPanel>
</template>

<style lang="scss">
  //
</style>
