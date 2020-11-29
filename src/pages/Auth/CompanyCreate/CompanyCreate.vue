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
          v-if="hasProfile"
          class="auth-page-company-create__back"
          @click.native="onBack"
        />

        <UiField
          label="Название компании"
          required
        >
          <UiInput
            v-model="company.name"
            left-icon="edit/edit-1"
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
            label="name"
            placeholder="Выбрать город"
            :options="cities"
            required
          />
        </UiField>

        <UiField
          label="Какой у вас бизнес?"
          required
        >
          <UiSelect
            v-model="company.category"
            label="name"
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

  get hasProfile () {
    return Boolean(this.$store.state.profile.profile)
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
    await this.$api.companies.create({
      // @ts-ignore
      name: this.company.name,
      // @ts-ignore
      cityId: this.company.city.id,
      // @ts-ignore
      categoryId: this.company.category.id
    })
    await this.$store.dispatch('approaches/fetch')
    await this.$store.dispatch('auth/fetchRefreshToken')

    this.onBack()
  }

  onBack () {
    this.$router.push({
      name: 'dashboard'
    })
  }
}
</script>

<style lang="scss" src="./CompanyCreate.scss"></style>
