<script lang="ts" setup>
import useValidate, { ValidateMaxLength, ValidateRequired } from 'validation/index'
import { normalizeCompanyParams } from '~/logics/company'
import FileUpload from '~/components/FileUpload/FileUpload.vue'
import { api, apiClient } from '~/boot/api'

useMeta({
  title: 'Інформація про компанію - pullcrm',
})

const baseStore = useBaseStore()
const toastsStore = useToastsStore()
const positionStore = usePositionStore()

const company = ref(positionStore.company)
const isLoading = ref(false)

const cities = ref([])
const companyTypes = ref([])

const validations = {
  name: {
    ...ValidateRequired('Введіть назву компанії'),
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },

  address: {
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },

  description: {
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },
}

const v$ = useValidate(validations, company)

const logo = computed(() => {
  return company.value.logo?.path
})

onBeforeMount(async () => {
  const result = await Promise.all([
    api.cities.all(),
    api.companyTypes.all(),
  ])

  cities.value = result[0]
  companyTypes.value = result[1]
})

async function onAvatar(file: any) {
  const userId = baseStore.profile.id

  const formData = new FormData()

  formData.append('files', file)
  formData.append('userId', userId)

  const [result] = await apiClient.upload(formData)

  await api.companies.update(company.value.id, {
    logoId: result.id,
  })

  // TODO: Replace to fetch company info
  return await baseStore.fetchProfile()
}

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await api.companies.update(company.value.id, normalizeCompanyParams(company.value))

    toastsStore.show({ title: 'Збережено!' })

    // TODO: Replace to fetch company info
    await baseStore.fetchProfile()
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="company-settings-page">
    <UiPanel
      size="m"
      responsive
    >
      <form @submit.prevent="submit">
        <UiFormValidator
          :validate="v$"
          class="ui-grid"
        >
          <template #default="{ resetFieldError, getFieldError }">
            <UiTitle
              size="s"
              :class="[
                'ui-grid-item',
                'ui-grid-item_12',
              ]"
            >
              Про компанію
            </UiTitle>

            <UiField
              :class="[
                'ui-grid-item',
                'ui-grid-item_12',
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
                'ui-grid-item_12',
              ]"
            >
              <UiInput
                v-model="company.name"
                placeholder="Введіть назву"
                data-test="form-name"
                @input="resetFieldError('name')"
              />
            </UiField>

            <UiField
              label="Місто"
              required
              :class="[
                'ui-grid-item',
                'ui-grid-item_12',
              ]"
            >
              <UiSelect
                v-model="company.city"
                label-key="name"
                required
                :options="cities"
                placeholder="Вибрати місто"
                data-test="form-cities-select"
              />
            </UiField>

            <UiField
              label="Категорія"
              required
              :class="[
                'ui-grid-item',
                'ui-grid-item_12',
              ]"
            >
              <UiSelect
                v-model="company.type"
                label-key="name"
                required
                :options="companyTypes"
                :clearable="false"
                placeholder="Вибрати категорію"
                data-test="form-categories-select"
              />
            </UiField>

            <UiField
              label="Адреса"
              :error="getFieldError('address')"
              :class="[
                'ui-grid-item',
                'ui-grid-item_12',
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
                'ui-grid-item_12',
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
                'ui-grid-item_12',
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
                'ui-grid-item_12',
              ]"
            />

            <UiField
              label="Viber"
              :class="[
                'ui-grid-item',
                'ui-grid-item_6',
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
                'ui-grid-item_mobile_12',
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
                'ui-grid-item_mobile_12',
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
                'ui-grid-item_mobile_12',
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
                'ui-grid-item_mobile_12',
              ]"
            >
              Зберегти
            </UiButton>
          </template>
        </UiFormValidator>
      </form>
    </UiPanel>
  </div>
</template>

<style lang="scss" src="./CompanySettingsPage.scss"></style>
