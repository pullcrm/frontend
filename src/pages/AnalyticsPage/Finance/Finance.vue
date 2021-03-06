<template>
  <AnalyticsLayout
    class="analytics-page-finance"
  >
    <div class="analytics-page-finance__header">
      <UiText
        size="m"
        left-icon="outlined/calendar"
        right-icon="outlined/caret-down"
      >
        1 фев – 28 фев 2021
      </UiText>

      <UiField>
        <UiSelect
          value="Все сотрудники"
          required
          :options="[]"
          :clearable="false"
          placeholder="Выбрать"
        />
      </UiField>
    </div>

    <Numbers
      class="analytics-page-finance__numbers"
    />

    <FinanceTable
      class="analytics-page-finance__table"
      :data="list"
    />
  </AnalyticsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import AnalyticsLayout from '../components/Layout.vue'

import Numbers from './components/Numbers.vue'
import FinanceTable from './components/Table.vue'

@Component({
  components: {
    Numbers,
    FinanceTable,
    AnalyticsLayout
  }
})
export default class Finance extends Vue {
  get list () {
    return this.$store.state.procedures.procedures
  }
}
</script>

<style lang="scss" src="./Finance.scss"></style>
