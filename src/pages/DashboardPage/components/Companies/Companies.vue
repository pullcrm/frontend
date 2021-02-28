<template>
  <div class="dashboard-page-companies">
    <UiTitle
      class="dashboard-page-companies__title"
      size="s"
      responsive
    >
      Мои компании
    </UiTitle>

    <UiCarousel
      class="dashboard-page-companies__carousel"
    >
      <UiCarouselItem
        v-for="company in companies"
        :key="`company-${company.company.id}`"
      >
        <Company
          :company="company.company"
          @click.native="onCompany(company)"
        />
      </UiCarouselItem>

      <UiCarouselItem>
        <CompanyButton />
      </UiCarouselItem>
    </UiCarousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Company from './Company.vue'
import CompanyButton from './CompanyButton.vue'

@Component({
  components: {
    Company,
    CompanyButton
  }
})
export default class Companies extends Vue {
  get companies () {
    return this.$store.state.companies.companies
  }

  async onCompany (companyInfo) {
    await this.$store.dispatch('auth/fetchCompanyToken', companyInfo)

    location.reload()
  }
}
</script>

<style lang="scss" src="./Companies.scss"></style>
