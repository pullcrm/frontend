<template>
  <Layout class="auth-page-company-create">
    <div class="auth-page-company-create__inner">
      <div class="auth-page-company-create__header">
        <UiTitle
          size="xl"
          responsive
        >
          Создание компании
        </UiTitle>

        <UiText
          size="m"
          responsive
        >
          Укажите информацию о компании
        </UiText>
      </div>

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
            v-model="company.category"
            label-key="name"
            placeholder="Выбрать категорию"
            :options="categories"
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
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '@/pages/Auth/components/Layout.vue'

@Component({
  components: {
    Layout
  }
})
export default class CompanyCreate extends Vue {
  company = {}

  cities = []
  categories = []

  isLoading = false

  get hasPositions () {
    return this.$store.getters['position/hasPositions']
  }

  async beforeMount () {
    const [categories, cities] = await Promise.all([
      this.$api.categories.all(),
      this.$api.cities.all()
    ])

    this.cities = cities
    this.categories = categories
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
        categoryId: this.company.category.id
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
    await this.$store.dispatch('profile')

    const position = this.$store.getters['position/positionsDict'][companyId]

    await this.$store.dispatch('auth/refreshTokenByPosition', position)
  }

  async onBack () {
    await this.$router.push({
      name: 'dashboard'
    })
  }
}
</script>

<style lang="scss" src="./CompanyCreate.scss"></style>
