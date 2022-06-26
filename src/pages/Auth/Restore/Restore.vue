<script lang="ts" setup>
// TODO: Make two form with the different validation
import useValidate, { ValidateMinLength, ValidatePhone, ValidateRequired, ValidateSameAs } from 'validation/index'
import Layout from '../components/Layout.vue'
import { api } from '~/boot/api'
import { getPhoneNumber } from '~/utils/format-phone'

// middleware: [
//   'redirects/dashboard',
// ],

useMeta({
  title: 'Відновлення паролю - pullcrm',
})

const route = useRoute()
const router = useRouter()

const toastsStore = useToastsStore()

const state = reactive({
  code: '',
  phone: '',
  password: '',
  repeatPassword: '',
})

const serverErrors = ref<any>({})

const isLoading = ref(false)
const isValidPhone = ref(false)

const validations = computed(() => {
  const rules: Record<string, any> = {
    phone: {
      ...ValidateRequired('Введіть номер телефону'),
      ...ValidatePhone('Не вірний формат номеру'),
      //       serverMessages: {
      //         invalid: 'Номер не знайдено',
      //       },
    },
  }

  if (isValidPhone.value) {
    rules.code = {
      ...ValidateMinLength('Код має складатися з 4-х символів', 4),
      ...ValidateRequired('Введіть код підтвердження'),
      //       serverMessages: {
      //         invalid: 'Не вірний код',
      //       },
    }

    rules.password = {
      ...ValidateMinLength('Мінімальна кількість символів: 4', 4),
      ...ValidateRequired('Введіть новий пароль'),
    }

    rules.repeatPassword = {
      ...ValidateRequired('Введіть повторно новий пароль'),
      ...ValidateSameAs('Паролі не співпадають', state.password),
    }
  }

  return rules
})

const v$ = useValidate(validations, state, { serverErrors })

onMounted(() => {
  const { phone } = route.query

  if (phone)
    state.phone = String(phone)
})

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await api.auth.restore({
      code: state.code,
      phone: getPhoneNumber(state.phone),
      newPassword: state.password,
    })

    await toastsStore.show({
      title: 'Пароль змінено!',
    })

    onBack()
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

async function confirmationPhone() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await api.users.confirmation({
      phone: getPhoneNumber(state.phone),
      type: 'RESET_PASSWORD',
    })

    isValidPhone.value = true
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
    title="Відновити доступ"
    sub-title="Введіть номер телефону, щоб відновити доступ"
    class="auth-page-restore"
  >
    <form
      @submit.prevent="isValidPhone ? submit() : confirmationPhone()"
    >
      <UiBack
        class="auth-page-restore__back"
        @click="onBack"
      />

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
              name="phone"
              left-icon="outlined/phone"
              inputmode="tel"
              placeholder="066"
              :disabled="isValidPhone"
              @input="resetFieldError('phone')"
            />
          </UiField>

          <template
            v-if="isValidPhone"
          >
            <UiField
              label="Код смс"
              :error="getFieldError('code')"
            >
              <UiInput
                v-model="state.code"
                left-icon="outlined/chat-centered-text"
                placeholder="Введіть СМС-код"
                @input="resetFieldError('code')"
              />
            </UiField>

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
          </template>

          <UiButton
            class="auth-page-restore__button"
            type="submit"
            size="l"
            theme="blue"
            :loading="isLoading"
          >
            {{ isValidPhone ? 'Змінити пароль' : 'Відновити' }}
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<style lang="scss" src="./Restore.scss"></style>
