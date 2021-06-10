<template>
  <SettingsLayout
    class="company-settings-page"
  >
    <UiPanel
      size="m"
      responsive
    >
      <div class="ui-grid">
        <UiTitle
          size="s"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        >
          О компании
        </UiTitle>

        <UiField
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        >
          <FileUpload
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
        </UiField>

        <UiField
          label="Название компании"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        >
          <UiInput
            v-model="company.name"
            placeholder="Введите название"
          />
        </UiField>

        <UiField
          label="Город"
          required
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
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
          label="Категория"
          required
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
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
          label="Адрес"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        >
          <UiInput
            v-model="company.address"
            placeholder="Введите адрес"
          />
        </UiField>

        <UiField
          label="Телефон"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        >
          <UiInput
            v-model="company.phone"
            placeholder="066"
          />
        </UiField>

        <UiField
          label="О компании"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        >
          <UiInput
            v-model="company.description"
            tag="textarea"
            placeholder="Введите текст"
          />
        </UiField>

        <UiDivider
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
        />

        <UiField
          label="Viber"
          :class="[
            'ui-grid-item',
            'ui-grid-item_6'
          ]"
        >
          <UiInput
            v-model="company.viber"
            placeholder="Viber"
          />
        </UiField>

        <UiField
          label="Telegram"
          :class="[
            'ui-grid-item',
            'ui-grid-item_6',
            'ui-grid-item_mobile_12'
          ]"
        >
          <UiInput
            v-model="company.telegram"
            placeholder="Telegram"
          />
        </UiField>

        <UiField
          label="Instagram"
          :class="[
            'ui-grid-item',
            'ui-grid-item_6',
            'ui-grid-item_mobile_12'
          ]"
        >
          <UiInput
            v-model="company.instagram"
            placeholder="Instagram"
          />
        </UiField>

        <UiField
          label="Facebook"
          :class="[
            'ui-grid-item',
            'ui-grid-item_6',
            'ui-grid-item_mobile_12'
          ]"
        >
          <UiInput
            v-model="company.facebook"
            placeholder="Facebook"
          />
        </UiField>

        <UiButton
          theme="blue"
          :loading="isLoading"
          responsive
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_mobile_12'
          ]"
          @click.native="save"
        >
          Сохранить
        </UiButton>
      </div>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { normalizeCompanyParams } from '~/logics/company'

import FileUpload from '~/components/FileUpload/FileUpload.vue'

import SettingsLayout from '../components/Layout.vue'

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

      await this.$api.companies.update(
        this.company.id,
        normalizeCompanyParams(this.company)
      )

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
