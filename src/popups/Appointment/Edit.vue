<script lang="ts" setup>
import AppointmentHeader from './components/Header.vue'
import AppointmentNotify from './components/Notify.vue'
import AppointmentDateTime from './components/DateTime.vue'
import AppointmentClientSimple from './components/ClientSimple.vue'
import AppointmentSpecialistSelect from './components/SpecialistSelect.vue'
import AppointmentProceduresSelect from './components/ProceduresSelect.vue'
import AppointmentAdditionalSettings from './components/AdditionalSettings.vue'
import FixedPanel from '~/components/FixedPanel/FixedPanel.vue'
import { getProceduresDuration } from '~/logics/appointment'
import dayjs from '~/utils/dayjs'
import { api } from '~/boot/api'
import type { IAppointmentUpdateParams } from '~/services/api'

interface IAppointmentForm extends Partial<IAppointmentUpdateParams> {
  date: any
  specialist: any
  hasRemindSMS: any
  status: string
  total: number
  source: string
}

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})

const smsStore = useSmsStore()
const popupStore = usePopupStore()
const toastsStore = useToastsStore()
const scheduleStore = useScheduleStore()
const specialistsStore = useSpecialistsStore()
const appointmentsStore = useAppointmentsStore()

const isLoading = ref(false)
const availableHours = ref<string[]>([])

// @ts-expect-error
const form = ref<IAppointmentForm>({
  ...props.appointment,
  date: dayjs(props.appointment.date),
  specialist: specialistsStore.specialists.find(({ id }) => id === props.appointment.specialist.id),
  hasRemindSMS: smsStore.isAuthorize ? Boolean(props.appointment.smsIdentifier) : null,
})

const specialists = computed(() => {
  return specialistsStore.specialists
})

const procedures = computed(() => {
  return form.value.specialist.procedures
})

const date = computed(() => {
  return form.value.date
})

const specialist = computed(() => {
  return form.value.specialist
})

const duration = computed(() => {
  const procedures = form.value.procedures || []

  return getProceduresDuration({ procedures })
})

onMounted(() => {
  fetchAvailableTime()
})

watch(
  () => duration.value,
  async () => {
    await fetchAvailableTime()

    checkStartTime()
  },
)

watch(
  () => specialist.value,
  async () => {
    await fetchAvailableTime()

    checkStartTime()
  },
)

watch(
  () => date.value,
  async () => {
    await fetchAvailableTime()

    checkStartTime()
  },
)

async function submit() {
  const isValid = await validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await appointmentsStore.update(form.value)
    await scheduleStore.fetch()

    popupStore.hide()
  }
  catch (err: any) {
    if (err.code === 400) {
      toastsStore.show({
        type: 'error',
        title: err.message,
      })

      return
    }

    throw err
  }
  finally {
    isLoading.value = false
  }
}

async function remove() {
  try {
    isLoading.value = true

    const result = await popupStore.askQuestion({
      title: 'Ви дійсно хочете видалити цей запис?',
      acceptButtonTitle: 'Видалити',
    })

    if (result) {
      // @ts-expect-error
      await api.appointments.remove(form.value.id)
      await scheduleStore.fetch()

      popupStore.hide()
    }
  }
  finally {
    isLoading.value = false
  }
}

async function fetchAvailableTime() {
  availableHours.value = []

  if (!form.value.specialist?.id || duration.value === 0)
    return

  availableHours.value = await api.appointments.availableTime({
    date: form.value.date.format('YYYY-MM-DD'),
    // @ts-expect-error
    excludeId: form.value.id,
    specialistId: form.value.specialist.id,
    duration: duration.value,
  })
}

function checkStartTime() {
  // @ts-expect-error
  const startTimeIndex = availableHours.value.indexOf(form.value.startTime)

  if (startTimeIndex === -1) {
    // @ts-expect-error
    form.value.startTime = null
  }
}

async function validate() {
  const { procedures } = form.value

  // @ts-expect-error
  if (procedures.length === 0) {
    await toastsStore.show({
      type: 'error',
      title: 'Потрібно вибрати послуги',
    })

    return false
  }

  return true
}
</script>

<template>
  <div class="appointment-popup__inner">
    <AppointmentHeader
      v-model:status="form.status"
      class="appointment-popup__header"
      title="Редагувати"
    />

    <form @submit.prevent="submit">
      <AppointmentClientSimple
        v-model:name="form.fullName"
        v-model:phone="form.phone"
      />

      <AppointmentSpecialistSelect
        v-model:specialist="form.specialist"
        class="appointment-popup__specialist"
        :options="specialists"
      />

      <AppointmentProceduresSelect
        v-model:total="form.total"
        v-model:procedures="form.procedures"
        class="appointment-popup__procedures"
        :options="procedures"
      />

      <AppointmentDateTime
        v-model:date="form.date"
        v-model:start-at="form.startTime"
        class="appointment-popup__date-time"
        :status="form.status"
        :duration="duration"
        :available-hours="availableHours"
      />

      <UiField
        class="appointment-popup__comment"
        label="Коментар"
      >
        <UiInput
          v-model="form.description"
          tag="textarea"
          placeholder="Введіть текст"
        />
      </UiField>

      <AppointmentNotify
        v-if="smsStore.isAuthorize"
        v-model:has-remind-sms="form.hasRemindSMS"
        v-model:has-creation-sms="form.hasCreationSMS"
        class="appointment-popup__notify"
        type="edit"
      />

      <AppointmentAdditionalSettings
        v-model:source="form.source"
        class="appointment-popup__additional-settings"
        type="edit"
      />

      <div
        id="popup-actions"
        class="appointment-popup__actions"
      >
        <UiButton
          type="submit"
          size="m"
          theme="blue"
          :loading="isLoading"
        >
          Зберегти
        </UiButton>

        <UiButton
          size="m"
          theme="danger-outlined"
          :loading="isLoading"
          @click="remove"
        >
          Видалити
        </UiButton>
      </div>

      <FixedPanel
        :threshold="0.25"
        show-when-invisible="#popup-actions"
        class="appointment-popup__fixed-button"
      >
        <UiContainer narrow>
          <UiButton
            type="submit"
            size="m"
            theme="blue"
            :loading="isLoading"
          >
            Зберегти
          </UiButton>
        </UiContainer>
      </FixedPanel>
    </form>
  </div>
</template>
