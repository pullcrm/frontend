<script lang="ts" setup>
import useValidate, { ValidatePhone, ValidateRequired } from 'validation/index'
import Layout from '../components/Layout.vue'
import { getPhoneNumber } from '~/utils/format-phone'

useMeta({
  title: 'Авторизація - pullcrm',
})

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const baseStore = useBaseStore()
const positionStore = usePositionStore()

const loading = ref(false)
const serverError = ref<any | null>(null)

const state = reactive({
  phone: '',
  password: '',
})

const validations = {
  phone: {
    ...ValidateRequired('Введіть номер телефону'),
    ...ValidatePhone('Не вірний формат номеру'),
  },

  password: {
    ...ValidateRequired('Введіть пароль'),
  },
}

const v$ = useValidate(validations, state)

onMounted(() => {
  const { phone } = route.query

  if (phone)
    state.phone = String(phone)
})

const onSubmit = async () => {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  loading.value = true

  try {
    await authStore.login({
      phone: getPhoneNumber(state.phone),
      password: state.password,
    })

    await baseStore.fetchProfile()

    if (positionStore.hasPositions) {
      const position = positionStore.positions[0]

      await authStore.refreshTokenByPosition(position)

      router.push({ name: 'dashboard' })

      return
    }

    await router.push({ name: 'companyCreate' })
  }
  catch (err: any) {
    if (err.fieldName) {
      serverError.value = err

      return
    }

    throw err
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <Layout
    title="Авторизація"
    sub-title="Увійдіть у систему, щоб отримати доступ до своєї компанії"
    class="auth-page-login"
    data-test="auth-page-login"
  >
    <form @submit.prevent="onSubmit">
      <UiFormValidator
        :validate="v$"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Телефон"
            :error="getFieldError('phone')"
          >
            <UiInput
              v-model="state.phone"
              mask="+38 (###) #### ###"
              type="phone"
              name="phone"
              inputmode="tel"
              left-icon="outlined/phone"
              placeholder="066"
              autocomplete="on"
              @input="
                serverError = null,
                resetFieldError('phone')
              "
            />
          </UiField>

          <UiField
            label="Пароль"
            :error="getFieldError('password')"
          >
            <UiInput
              v-model="state.password"
              type="password"
              name="password"
              left-icon="outlined/key"
              placeholder="Введіть пароль"
              autocomplete="on"
              @input="
                serverError = null,
                resetFieldError('password')
              "
            />
          </UiField>

          <UiText
            tag="RouterLink"
            :to="{
              name: 'restore',
              query: { phone: state.phone },
            }"
            size="s"
            class="auth-page-login__reset"
          >
            Відновити доступ
          </UiText>

          <UiAlert
            v-if="serverError"
            theme="error"
            left-icon="solid/warning-circle-fill"
            class="auth-page-login__error"
          >
            {{ serverError.message }}
          </UiAlert>

          <div class="auth-page-login__actions">
            <UiButton
              type="submit"
              size="l"
              theme="blue"
              :loading="loading"
            >
              Увійти
            </UiButton>

            <UiButton
              :to="{
                name: 'registration',
                query: { phone: state.phone },
              }"
              type="submit"
              size="l"
              theme="info-outlined"
              data-test="registration-button"
            >
              Реєстрація
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<style lang="scss" src="./Login.scss"></style>
