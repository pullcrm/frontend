<script lang="ts" setup>
import pick from 'lodash/pick'

import useValidate, { ValidateMinLength, ValidatePhone, ValidateRequired, ValidateSameAs } from 'validation/index'
import Layout from '../components/Layout.vue'
import type { IRegistrationUserParams } from '~/services/api'
import { api } from '~/boot/api'
import { getPhoneNumber } from '~/utils/format-phone'

// TODO: Use middleware
// middleware: [
//   'redirects/dashboard',
// ],

useMeta({
  title: 'Реєстрація - pullcrm',
})

const SITE_HOST = process.env.SITE_HOST

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const popupStore = usePopupStore()

const form = reactive<IRegistrationUserParams>({
  fullName: '',
  phone: '',
  password: '',
})

const isLoading = ref(false)

const validations = {
  fullName: {
    ...ValidateMinLength('Мінімальна кількість символів: 4', 4),
    ...ValidateRequired('Введіть ваше ім\'я'),
  },

  phone: {
    ...ValidatePhone('Не вірний формат номеру'),
    ...ValidateRequired('Введіть номер телефону'),
  },

  password: {
    ...ValidateMinLength('Мінімальна кількість символів: 4', 4),
    ...ValidateRequired('Введіть пароль'),
  },
}

const serverErrors = ref<any>({})

const v$ = useValidate(validations, form, { serverErrors })

const policyUrl = computed(() => {
  return `https://${SITE_HOST}/documents/policy/`
})

onMounted(() => {
  const { phone } = route.query

  if (phone)
    form.phone = String(phone)
})

async function onSubmit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await api.users.confirmation({
      phone: getPhoneNumber(form.phone),
      type: 'REGISTRATION',
    })

    return confirmation()
  }
  catch (err: any) {
    if (err.code === 400) {
      serverErrors.value = {
        [err.fieldName]: [err.message],
      }

      return
    }

    throw err
  }
  finally {
    isLoading.value = false
  }
}

async function confirmation() {
  const result = await popupStore.smsConfirmation({
    title: 'Реєстрація',
    subTitle: `На ваш телефон ${form.phone} був відправлений СМС-код для підтвердження реєстрації`,
    submit: onCreateUser,
  })

  if (result) {
    // await this.$track('userRegistration', {})

    return router.push({
      name: 'companyCreate',
      query: pick(route.query, [
        'companyType',
      ]),
    })
  }
}

async function onCreateUser(code: string) {
  const submitForm = {
    ...form,
    phone: getPhoneNumber(form.phone),
    code,
  }

  await api.auth.registration(submitForm)
  await authStore.login(submitForm)
}

function onBack() {
  router.push({
    name: 'login',
    query: {
      ...route.query,
    },
  })
}
</script>

<template>
  <Layout
    title="Реєстрація"
    sub-title="Пройдіть реєстрацію, щоб отримати доступ до своєї компанії"
    class="auth-page-registration"
    data-test="registration-page"
  >
    <form
      @submit.prevent="onSubmit"
    >
      <UiBack
        class="auth-page-registration__back"
        @click="onBack"
      />

      <UiFormValidator
        :validate="v$"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Ім'я та Прізвище"
            :error="getFieldError('fullName')"
          >
            <UiInput
              v-model="form.fullName"
              left-icon="outlined/pencil"
              name="name"
              placeholder="Введіть Ім'я і Призвіще"
              data-test="form-name"
              @input="resetFieldError('fullName')"
            />
          </UiField>

          <UiField
            label="Телефон"
            :error="getFieldError('phone')"
          >
            <UiInput
              v-model="form.phone"
              mask="+38 (###) #### ###"
              name="phone"
              type="phone"
              inputmode="tel"
              left-icon="outlined/phone"
              placeholder="066"
              @input="resetFieldError('phone')"
            />
          </UiField>

          <UiField
            label="Пароль"
            :error="getFieldError('password')"
          >
            <UiInput
              v-model="form.password"
              left-icon="outlined/key"
              name="password"
              type="password"
              placeholder="Введіть пароль"
              @input="resetFieldError('password')"
            />
          </UiField>

          <UiText
            class="auth-page-registration__policy"
            size="s"
            data-test="policy-link"
          >
            Натискаючи на кнопку, я погоджуюсь з <a :href="policyUrl">Політикою обробки персональних даних</a>
          </UiText>

          <UiButton
            class="auth-page-registration__button"
            type="submit"
            size="l"
            theme="blue"
            :loading="isLoading"
          >
            Зареєструватись
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<style lang="scss" src="./Registration.scss"></style>
