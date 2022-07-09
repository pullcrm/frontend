<script lang="ts">
import Numbers from './components/Numbers/Numbers.vue'
import Companies from './components/Companies/Companies.vue'
import DonateBanner from './components/DonateBanner.vue'
import { ADMIN } from '~/constants/roles'

import dayjs from '~/utils/dayjs'

export default {
  components: {
    Numbers,
    Companies,
    DonateBanner,
  },

  async preFetch() {
    const positionStore = usePositionStore()
    const analyticsStore = useAnalyticsStore()

    if (positionStore.role.name === ADMIN) {
      await analyticsStore.fetchSimpleStats({
        date: dayjs(),
      })
    }
  },

  setup() {
    useMeta({
      title: 'Головний дашборд - pullcrm',
    })
  },
}
</script>

<template>
  <div class="dashboard-page" data-test="dashboard-page">
    <UiContainer>
      <Companies
        class="dashboard-page__section"
      />

      <Numbers
        class="dashboard-page__section"
      />

      <div class="ui-grid">
        <DonateBanner
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
          ]"
        />
      </div>
    </UiContainer>
  </div>
</template>

<style lang="scss" src="./DashboardPage.scss"></style>
