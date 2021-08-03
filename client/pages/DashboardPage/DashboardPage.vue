<template>
  <div class="dashboard-page">
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
            'ui-grid-item_12'
          ]"
        />
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ADMIN } from '~/constants/roles'

import dayjs from '~/utils/dayjs'

import Numbers from './components/Numbers/Numbers.vue'
import Companies from './components/Companies/Companies.vue'
import DonateBanner from './components/DonateBanner.vue'

@Component({
  layout: 'dashboard',

  components: {
    Numbers,
    Companies,
    DonateBanner
  },

  async asyncData ({ typedStore }) {
    const role = typedStore.getters['position/role']

    if (role.name === ADMIN) {
      await typedStore.dispatch('analytics/fetchSimpleStats', {
        date: dayjs()
      })
    }
  },

  head () {
    return {
      title: 'Главный дашборд - pullcrm'
    }
  }
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" src="./DashboardPage.scss"></style>
