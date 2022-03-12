<template>
  <Layout
    title="Створення компанії"
    sub-title="Вкажіть інформацію про компанію"
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
        label="Назва компанії"
        required
      >
        <UiInput
          v-model="company.name"
          left-icon="outlined/pencil"
          placeholder="Ваша компанія"
          required
        />
      </UiField>

      <UiField
        label="Місто"
        required
      >
        <UiSelect
          v-model="company.city"
          required
          :options="cities"
          label-key="name"
          placeholder="Вибрати місто"
        />
      </UiField>

      <UiField
        label="Категорія"
        required
      >
        <UiSelect
          v-model="company.type"
          label-key="name"
          placeholder="Вибрати категорію"
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
        Продовжити
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

  async asyncData ({ api }) {
    const [companyTypes, cities] = await Promise.all([
      api.companyTypes.all(),
      api.cities.all()
    ])

    return {
      cities,
      companyTypes
    }
  },

  head () {
    return {
      title: 'Нова компанія - pullcrm'
    }
  }
})
export default class CompanyCreate extends Vue {
  readonly cities = []
  readonly companyTypes = []

  company = {
    name: '',
    city: null,
    type: null
  }

  isLoading = false

  get hasPositions () {
    return this.$typedStore.getters['position/hasPositions']
  }

  mounted () {
    const type = this.companyTypes.find(({ id }) => {
      return id === Number(this.$route.query.companyType)
    })

    if (type) {
      this.company.type = type
    }
  }

  async submit () {
    try {
      this.isLoading = true

      const { id: companyId } = await this.$api.companies.create({
        name: this.company.name,
        cityId: this.company.city.id,
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
