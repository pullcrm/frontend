<template>
  <Layout
    title="Создание компании"
    sub-title="Укажите информацию о компании"
    class="auth-page-company-create"
  >
    <form
      @submit.prevent="submit"
    >
      <UiBack
        v-if="hasPositions"
        class="auth-page-company-create__back"
        @click.native="onBack"
      />

      <UiField
        label="Название компании"
        required
      >
        <UiInput
          v-model="company.name"
          left-icon="outlined/pencil"
          placeholder="Ваша компания"
          required
        />
      </UiField>

      <UiField
        label="Город"
        required
      >
        <UiSelect
          v-model="company.city"
          required
          :options="cities"
          label-key="name"
          placeholder="Выбрать город"
        />
      </UiField>

      <UiField
        label="Категория"
        required
      >
        <UiSelect
          v-model="company.type"
          label-key="name"
          placeholder="Выбрать категорию"
          :options="companyTypes"
          required
        />
      </UiField>

      <UiButton
        class="auth-page-company-create__button"
        type="submit"
        size="l"
        theme="blue"
        :loading="isLoading"
      >
        Продолжить
      </UiButton>
    </form>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '~/pages/Auth/components/Layout.vue'

@Component({
  components: {
    Layout
  },

  head () {
    return {
      title: 'Новая компания - pullcrm'
    }
  }
})
export default class CompanyCreate extends Vue {
  company = {}

  cities = []
  companyTypes = []

  isLoading = false

  get hasPositions () {
    return this.$typedStore.getters['position/hasPositions']
  }

  async beforeMount () {
    const [companyTypes, cities] = await Promise.all([
      this.$api.companyTypes.all(),
      this.$api.cities.all()
    ])

    this.cities = cities
    this.companyTypes = companyTypes
  }

  async submit () {
    try {
      this.isLoading = true

      const { id: companyId } = await this.$api.companies.create({
        // @ts-ignore
        name: this.company.name,
        // @ts-ignore
        cityId: this.company.city.id,
        // @ts-ignore
        typeId: this.company.type.id
      })

      await this.onCompany(companyId)

      const { href } = this.$router.resolve({
        name: 'dashboard'
      })

      window.location.href = href
    } finally {
      this.isLoading = false
    }
  }

  async onCompany (companyId) {
    await this.$typedStore.dispatch('profile')

    const position = this.$typedStore.getters['position/positionsDict'][companyId]

    await this.$typedStore.dispatch('auth/refreshTokenByPosition', position)
  }

  async onBack () {
    await this.$router.push({
      name: 'dashboard'
    })
  }
}
</script>

<style lang="scss" src="./CompanyCreate.scss"></style>
