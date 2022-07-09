<script lang="ts" setup>
import useValidate, { ValidatePhone, ValidateRequired } from 'validation/index'
import InfoPanel from './components/InfoPanel.vue'
import dayjs from '~/utils/dayjs'
import { minutesToTime, setTime } from '~/utils/time'
import { api } from '~/boot/api'
import { sendIframeMessage } from '~/widgets/logics'
import { getPhoneNumber } from '~/utils/format-phone'

const route = useRoute()
const router = useRouter()

const widgetStore = useWidgetStore()
const toastsStore = useToastsStore()

const procedures = ref<any[]>([])

const specialist = computed(() => {
  return widgetStore.specialist
})

const company = computed(() => {
  return widgetStore.company
})

onMounted(async () => {
  procedures.value = specialist.value.procedures

  if (procedures.value.length === 0) {
    procedures.value = await api.public.proceduresByCompanyId({
      companyId: company.value.id,
    })
  }
})

const isLoading = ref(false)

const form = reactive({
  phone: '',
  fullName: '',
  description: '',
})

const settings = computed(() => {
  return company.value.sms_setting || {}
})

const validations = {
  fullName: {
    ...ValidateRequired('Введіть ваше ім\'я'),
  },

  phone: {
    ...ValidatePhone('Не вірний формат номеру'),
    ...ValidateRequired('Введіть номер телефону'),
  },
}

const v$ = useValidate(validations, form)

const activeProcedureIds = computed(() => {
  // @ts-expect-error
  return [].concat(route.query.procedureIds ?? []).map(Number)
})

const activeProcedures = computed(() => {
  return procedures.value.filter((item) => {
    return activeProcedureIds.value.includes(item.id)
  })
})

const duration = computed(() => {
  return activeProcedures.value
    .reduce((acc, { duration }) => acc + duration, 0)
})

const date = computed(() => {
  return route.query.date as string
})

const time = computed(() => {
  return route.query.time as string
})

const dateText = computed(() => {
  const _date = setTime(new Date(date.value), time.value)

  // Четвер, 19:00 – 20:00
  return `${dayjs(date.value).format('dddd')}, ${_date.format('HH:mm')} - ${_date.add(duration.value, 'minute').format('HH:mm')}`
})

async function onSubmit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    // TODO: Need to remove
    const { hasCreationSMS, hasRemindSMS } = settings.value || {}

    await api.public.appointmentCreate({
      ...form,
      phone: getPhoneNumber(form.phone),
      date: date.value,
      startTime: `${time.value}:00`,
      companyId: company.value.id,
      procedures: activeProcedureIds.value,
      specialistId: specialist.value.id,
      hasRemindSMS,
      hasCreationSMS,
    })

    toastsStore.show({
      title: 'Запис створено',
    })

    sendIframeMessage('orderCreated')

    await router.push({
      ...route,
      name: 'fullWidgetOrderPage',
    })
  }
  catch (err: any) {
    if (err.status === 400) {
      toastsStore.show({
        type: 'error',
        title: 'Щось пішло не так, спробуйте повернутись назад і вибрати інший час!',
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

<script lang="ts">
export default {
  async preFetch({ currentRoute }: any) {
    const widgetStore = useWidgetStore()

    const specialistId = Number(currentRoute.query.specialistId || 0)

    await widgetStore.fetchSpecialist(specialistId)
  },
}
</script>

<template>
  <div class="full-widget-confirmation-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-confirmation-page__title"
    >
      Підтвердити запис
    </UiTitle>

    <InfoPanel
      :date="dateText"
      :specialist="specialist"
      :procedures="activeProcedures"
      class="full-widget-confirmation-page__info-panel"
    />

    <form
      class="full-widget-confirmation-page__form"
      @submit.prevent="onSubmit"
    >
      <UiFormValidator
        :validate="v$"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            :error="getFieldError('fullName')"
            required
          >
            <UiInput
              v-model="form.fullName"
              trim
              name="fullName"
              left-icon="outlined/user"
              placeholder="Ім'я"
              @input="resetFieldError('fullName')"
            />
          </UiField>

          <UiField
            :error="getFieldError('phone')"
            required
          >
            <UiInput
              v-model="form.phone"
              mask="+38 (###) #### ###"
              name="phone"
              inputmode="tel"
              left-icon="outlined/phone"
              placeholder="Телефон"
              data-test="form-phone"
              @input="resetFieldError('phone')"
            />
          </UiField>

          <UiField>
            <UiInput
              v-model="form.description"
              tag="textarea"
              name="description"
              left-icon="outlined/chat-circle-dots"
              placeholder="Коментар або побажання"
            />
          </UiField>

          <UiText
            v-if="settings.hasRemindSMS"
            size="s"
            class="full-widget-confirmation-page__disclaimer"
          >
            Ми нагадаємо вам про запис за {{ minutesToTime(settings.remindSMSMinutes) }} до початку
          </UiText>

          <UiButton
            type="submit"
            size="m"
            theme="blue"
            :loading="isLoading"
            class="full-widget-confirmation-page__button"
          >
            Підтвердити
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </div>
</template>

<style lang="scss" src="./ConfirmationPage.scss"></style>
