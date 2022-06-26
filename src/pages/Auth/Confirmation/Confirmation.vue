<script lang="ts" setup>
import useValidate, { ValidateMinLength, ValidateRequired, ValidateSameAs } from 'validation/index'
import Layout from '../components/Layout.vue'
import { api } from '~/boot/api'

useMeta({
  title: 'Завершення реєстрації - pullcrm',
})

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const baseStore = useBaseStore()
const toastsStore = useToastsStore()
const positionStore = usePositionStore()

const state = reactive({
  password: '',
  repeatPassword: '',
})

const isLoading = ref(false)

const slug = computed<string>(() => {
  return String(route.params.slug)
})

const validations = {
  password: {
    ...ValidateMinLength('Мінімальна кількість символів: 4', 4),
    ...ValidateRequired('Введіть пароль'),
  },

  repeatPassword: {
    ...ValidateRequired('Введіть повторно новий пароль'),
    ...ValidateSameAs('Паролі не співпадають', state.password),
  },
}

const v$ = useValidate(validations, state)

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    const tokens = await api.profile.confirm({
      token: slug.value,
      password: state.password,
    })

    await authStore.saveTokens(tokens)

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
    if (err.fieldName === 'code') {
      toastsStore.show({
        title: err.message,
        type: 'error',
      })

      return
    }

    if (err.status === 404) {
      toastsStore.show({
        title: 'Користувач не знайдений',
        type: 'error',
      })

      return
    }

    throw err
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Layout
    title="Завершення реєстрації"
    sub-title="Придумайте пароль для входу"
    class="auth-confirmation"
  >
    <form
      @submit.prevent="submit"
    >
      <UiFormValidator
        :validate="v$"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Пароль"
            :error="getFieldError('password')"
          >
            <UiInput
              v-model="state.password"
              left-icon="outlined/key"
              name="password"
              type="password"
              placeholder="Введіть новий пароль"
              @input="resetFieldError('password')"
            />
          </UiField>

          <UiField
            label="Повторіть пароль"
            :error="getFieldError('repeatPassword')"
          >
            <UiInput
              v-model="state.repeatPassword"
              left-icon="outlined/key"
              name="repeatPassword"
              type="password"
              placeholder="Введіть повторно новий пароль"
              @input="resetFieldError('repeatPassword')"
            />
          </UiField>

          <UiButton
            class="auth-confirmation__button"
            type="submit"
            size="l"
            theme="blue"
            :loading="isLoading"
          >
            Підтвердити
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<style lang="scss" src="./Confirmation.scss"></style>
