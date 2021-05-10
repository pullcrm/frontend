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
          label-key="name"
          required
          :options="cities"
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
          v-model="company.type"
          label-key="name"
          required
          :options="companyTypes"
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

import FileUpload from '~/components/FileUpload/FileUpload.vue'

import SettingsLayout from '../components/SettingsLayout.vue'

@Component({
  layout: 'dashboard',

  components: {
    FileUpload,
    SettingsLayout
  }
})
export default class Settings extends Vue {
  isLoading = false

  company = this.$typedStore.getters['position/company']

  cities = []
  companyTypes = []

  companyName!: string

  get logo () {
    return this.company.logo?.path
  }

  async beforeMount () {
    const [companyTypes, cities] = await Promise.all([
      this.$api.companyTypes.all(),
      this.$api.cities.all()
    ])

    this.cities = cities
    this.companyTypes = companyTypes
  }

  async onAvatar (file) {
    const userId = this.$typedStore.state.profile.id

    const formData = new FormData()

    formData.append('file', file)
    formData.append('userId', userId)

    const result = await this.$api.files.create(formData)

    await this.$api.companies.update(this.company.id, {
      logoId: result.id
    })

    // TODO: Replace to fetch company info
    return await this.$typedStore.dispatch('profile')
  }

  async save () {
    try {
      this.isLoading = true

      await this.$api.companies.update(this.company.id, {
        name: this.company.name,
        cityId: this.company.city.id,
        typeId: this.company.type.id
      })

      this.$typedStore.dispatch('toasts/show', { title: 'Сохранено!' })

      // TODO: Replace to fetch company info
      await this.$typedStore.dispatch('profile')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./CompanySettingsPage.scss"></style>
