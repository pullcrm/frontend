<template>
  <SettingsLayout
    class="company-settings-page"
  >
    <UiPanel
      size="m"
      responsive
    >
      <form @submit.prevent="submit">
        <UiFormValidator
          ref="formValidator"
          :validations="validations"
          class="ui-grid"
        >
          <template #default="{ resetFieldError, getFieldError }">
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
              :error="getFieldError('name')"
              required
              :class="[
                'ui-grid-item',
                'ui-grid-item_12'
              ]"
            >
              <UiInput
                v-model="company.name"
                placeholder="Введите название"
                @input="resetFieldError('name')"
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
              :error="getFieldError('address')"
              :class="[
                'ui-grid-item',
                'ui-grid-item_12'
              ]"
            >
              <UiInput
                v-model="company.address"
                placeholder="Введите адрес"
                @input="resetFieldError('address')"
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
                mask="+38 (###) #### ###"
                placeholder="066"
              />
            </UiField>

            <UiField
              label="О компании"
              :error="getFieldError('description')"
              :class="[
                'ui-grid-item',
                'ui-grid-item_12'
              ]"
            >
              <UiInput
                v-model="company.description"
                tag="textarea"
                placeholder="Введите текст"
                @input="resetFieldError('description')"
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
              type="submit"
              theme="blue"
              :loading="isLoading"
              responsive
              :class="[
                'ui-grid-item',
                'ui-grid-item_12',
                'ui-grid-item_mobile_12'
              ]"
            >
              Сохранить
            </UiButton>
          </template>
        </UiFormValidator>
      </form>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { normalizeCompanyParams } from '~/logics/company'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

import FileUpload from '~/components/FileUpload/FileUpload.vue'

import SettingsLayout from '../components/Layout.vue'

@Component({
  layout: 'dashboard',

  components: {
    FileUpload,
    SettingsLayout
  },

  head () {
    return {
      title: 'Информация о компании - pullcrm'
    }
  }
})
export default class Settings extends Vue {
  isLoading = false

  company = this.$typedStore.getters['position/company']

  cities = []
  companyTypes = []

  companyName!: string

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      name: {
        rules: {
          max: 255,
          required: true
        },
        messages: {
          max: 'Максимальное количество символов: 255',
          required: 'Введите название компании'
        }
      },
      address: {
        rules: {
          max: 255
        },
        messages: {
          max: 'Максимальное количество символов: 255'
        }
      },
      description: {
        rules: {
          max: 255
        },
        messages: {
          max: 'Максимальное количество символов: 255'
        }
      }
    }
  }

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

    formData.append('files', file)
    formData.append('userId', userId)

    const [result] = await this.$apiClient.upload(formData)

    await this.$api.companies.update(this.company.id, {
      logoId: result.id
    })

    // TODO: Replace to fetch company info
    return await this.$typedStore.dispatch('profile')
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

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

  validate () {
    return this.$refs.formValidator.validate(this.company)
  }
}
</script>

<style lang="scss" src="./CompanySettingsPage.scss"></style>
