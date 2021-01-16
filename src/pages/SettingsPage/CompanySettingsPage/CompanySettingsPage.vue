<template>
  <SettingsLayout
    class="company-settings-page"
  >
    <UiTitle
      class="company-settings-page__title"
      size="l"
      responsive
    >
      Настройки компании
    </UiTitle>

    <FileUpload
      :image="logo"
      responsive
      @input="onAvatar"
    >
      <template #default="{ url }">
        <UiAvatar
          :image="url"
          :name="company.name"
          size="xl"
          responsive
        />
      </template>
    </FileUpload>

    <UiField
      label="Название компании"
    >
      <UiInput
        v-model="company.name"
        placeholder="Введите название"
      />
    </UiField>

    <UiField
      label="Город"
      required
    >
      <UiSelect
        v-model="company.city"
        label="name"
        required
        :options="cities"
        :clearable="false"
        placeholder="Выбрать город"
      />
    </UiField>

    <UiField
      label="Какой у вас бизнес?"
      required
    >
      <UiSelect
        v-model="company.category"
        label="name"
        required
        :options="categories"
        :clearable="false"
        placeholder="Выбрать категорию"
      />
    </UiField>

    <UiButton
      theme="blue"
      :loading="isLoading"
      responsive
      @click.native="save"
    >
      Сохранить
    </UiButton>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import FileUpload from '@/components/FileUpload/FileUpload.vue'

import SettingsLayout from '../components/SettingsLayout.vue'

@Component({
  components: {
    FileUpload,
    SettingsLayout
  }
})
export default class Settings extends Vue {
  isLoading = false

  company = this.$store.getters['company/current']

  cities = []
  categories = []

  companyName!: string

  get logo () {
    return this.company.logo?.path
  }

  async beforeMount () {
    const [categories, cities] = await Promise.all([
      this.$api.categories.all(),
      this.$api.cities.all()
    ])

    this.cities = cities
    this.categories = categories
  }

  async onAvatar (file) {
    const result = await this.$store.dispatch('files/create', file)

    await this.$api.companies.update(this.company.id, {
      logoId: result.id
    })

    return this.$store.dispatch('company/fetch')
  }

  async save () {
    try {
      this.isLoading = true

      await this.$api.companies.update(this.company.id, {
        name: this.company.name,
        cityId: this.company.city.id,
        categoryId: this.company.category.id
      })

      this.$store.dispatch('toasts/show', { title: 'Сохранено!' })

      await this.$store.dispatch('company/fetch')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./CompanySettingsPage.scss"></style>
