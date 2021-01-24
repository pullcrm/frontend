<template>
  <div class="dashboard-page">
    <UiContainer>
      <div class="ui-grid">
        <UiTitle
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
          size="s"
          responsive
        >
          Мои компании
        </UiTitle>

        <Company
          v-for="company in companies"
          :key="`company-${company.company.id}`"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_6',
            'ui-grid-item_laptop_3'
          ]"
          :company="company.company"
          @click.native="onCompany(company)"
        />

        <CompanyButton
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_6',
            'ui-grid-item_laptop_3'
          ]"
        />

        <DonateBanner
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        />

        <AnalyticPanel
          v-for="(analytic, index) in analytics"
          :key="`analytic-${index}`"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_6',
            'ui-grid-item_laptop_4'
          ]"
          :name="analytic.name"
          :value="analytic.value"
        />
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Company from './components/Company.vue'
import DonateBanner from './components/DonateBanner.vue'
import CompanyButton from './components/CompanyButton.vue'
import AnalyticPanel from './components/AnalyticPanel.vue'

@Component({
  components: {
    Company,
    DonateBanner,
    CompanyButton,
    AnalyticPanel
  }
})
export default class Dashboard extends Vue {
  get companies () {
    return this.$store.state.companies.companies
  }

  get analytics () {
    return [
      {
        name: 'Доход за сегодня',
        value: 520
      },
      {
        name: 'Доход за текущий месяц',
        value: 5880
      },
      {
        name: 'Средний чек за месяц',
        value: 230
      }
    ]
  }

  async onCompany (companyInfo) {
    await this.$store.dispatch('auth/fetchCompanyToken', companyInfo)

    location.reload()
  }
}
</script>
