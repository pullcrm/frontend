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
              Про компанію
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
              label="Назва компанії"
              :error="getFieldError('name')"
              required
              :class="[
                'ui-grid-item',
                'ui-grid-item_12'
              ]"
            >
              <UiInput
                v-model="company.name"
                placeholder="Введіть назву"
                @input="resetFieldError('name')"
              />
            </UiField>

            <UiField
              label="Місто"
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
                placeholder="Вибрати місто"
              />
            </UiField>

            <UiField
              label="Категорія"
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
                placeholder="Вибрати категорію"
              />
            </UiField>

            <UiField
              label="Адреса"
              :error="getFieldError('address')"
              :class="[
                'ui-grid-item',
                'ui-grid-item_12'
              ]"
            >
              <UiInput
                v-model="company.address"
                placeholder="Введіть адресу"
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
                inputmode="tel"
                placeholder="066"
              />
            </UiField>

            <UiField
              label="Про компанію"
              :error="getFieldError('description')"
              :class="[
                'ui-grid-item',
                'ui-grid-item_12'
              ]"
            >
              <UiInput
                v-model="company.description"
                tag="textarea"
                placeholder="Введіть текст"
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
              Зберегти
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
      title: 'Інформація про компанію - pullcrm'
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
          max: 'Максимальна кількість символів: 255',
          required: 'Введіть назву компанії'
        }
      },
      address: {
        rules: {
          max: 255
        },
        messages: {
          max: 'Максимальна кількість символів: 255'
        }
      },
      description: {
        rules: {
          max: 255
        },
        messages: {
          max: 'Максимальна кількість символів: 255'
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

      this.$typedStore.dispatch('toasts/show', { title: 'Збережено!' })

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
