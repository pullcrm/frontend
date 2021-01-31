<template>
  <SettingsLayout
    class="company-settings-page"
  >
    <div class="ui-grid">
      <FileUpload
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        :image="logo"
        responsive
        @input="onAvatar"
      >
        <template #default="{ url }">
          <UiAvatar
            :image="url"
            :name="company.name"
            size="l"
            responsive
          />
        </template>
      </FileUpload>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        label="Название компании"
      >
        <UiInput
          v-model="company.name"
          placeholder="Введите название"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
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
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Категория"
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

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        label="Адрес"
      >
        <UiInput
          value=""
          placeholder="Введите адрес"
        />
      </UiField>

      <UiTitle
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        size="s"
        responsive
      >
        Дополнительная информация
      </UiTitle>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        label="Телефон"
      >
        <UiInput
          value=""
          placeholder="066"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Viber"
      >
        <UiInput
          value=""
          placeholder="Viber"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Telegram"
      >
        <UiInput
          value=""
          placeholder="Telegram"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Instagram"
      >
        <UiInput
          value=""
          placeholder="Instagram"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Facebook"
      >
        <UiInput
          value=""
          placeholder="Facebook"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        label="О компании"
      >
        <UiInput
          tag="textarea"
          value=""
          placeholder="Введите текст"
        />
      </UiField>

      <UiButton
        :class="[
          'ui-grid-item',
          'ui-grid-item_12'
        ]"
        theme="blue"
        :loading="isLoading"
        responsive
        @click.native="save"
      >
        Сохранить
      </UiButton>
    </div>
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
