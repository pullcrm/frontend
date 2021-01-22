<template>
  <UiContainer
    class="base-layout-header"
  >
    <div class="base-layout-header__inner">
      <UiPopover
        size="m"
        placement="bottom"
      >
        <template #default="{ toggle }">
          <CompanySelector
            class="base-layout-header__selector"
            @click.native="toggle"
          />
        </template>

        <template #body>
          <div class="base-layout-header__companies">
            <Company
              v-for="company in companies"
              :key="company.id"
              :company="company.company"
              @click.native="onCompany(company)"
            />

            <UiButton
              :to="{
                name: 'companyCreate'
              }"
              size="l"
              theme="blue"
            >
              Добавить компанию
            </UiButton>
          </div>
        </template>
      </UiPopover>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Company from './Company.vue'
import CompanySelector from './CompanySelector.vue'

@Component({
  components: {
    Company,
    CompanySelector
  }
})
export default class DashboardHeader extends Vue {
  get companies () {
    return this.$store.state.companies.companies
  }

  async onCompany (companyInfo) {
    await this.$store.dispatch('auth/fetchCompanyToken', companyInfo)

    location.reload()
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
