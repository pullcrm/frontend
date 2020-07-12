<template>
  <Layout
    class="auth-company-create"
  >
    <StepOne
      v-show="step === 1"
      :cities="cities"
      :categories="categories"
      @submit="onCompanyInfo"
    />

    <StepSecond
      v-show="step === 2"
      @submit="step = 3"
    />

    <StepThird
      v-show="step === 3"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ICompaniesCreateParams } from '@/services/api'

import Layout from '../Layout/Layout.vue'

import StepOne from './components/StepOne.vue'
import StepThird from './components/StepThird.vue'
import StepSecond from './components/StepSecond.vue'

@Component({
  components: {
    Layout,
    StepOne,
    StepThird,
    StepSecond
  }
})
export default class Create extends Vue {
  step = 1
  company: ICompaniesCreateParams

  cities = []
  categories = []

  async beforeMount () {
    const [categories, cities] = await Promise.all([
      this.$api.categories.all(),
      this.$api.cities.all()
    ])

    this.cities = cities
    this.categories = categories
  }

  async onCompanyInfo (company) {
    await this.$api.companies.create(company)
    await this.$store.dispatch('approaches/fetch')
    await this.$store.dispatch('auth/fetchRefreshToken')

    this.step = 2
  }
}
</script>

<style lang="scss">
  .auth-company-create {
    .auth-form {
      &__title,
      &__sub-title {
        text-align: center;
      }
    }
  }
</style>
