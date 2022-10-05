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
import { IN_PROGRESS, IN_QUEUE } from '~/constants/appointment'
import { toDate } from '~/utils/date-time'
import { SOURCE_DASHBOARD } from '~/constants'
import { api } from '~/boot/api'

const props = defineProps({
  specialistId: {
    type: Number,
    default: null,
  },

  time: {
    type: String,
    default: null,
  },

  // AppointmentStatuses
  defaultStatus: {
    type: String,
    default: undefined,
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

const form = ref({
  date: toDate(scheduleStore.date),
  total: 0,
  phone: '',
  source: SOURCE_DASHBOARD,
  status: IN_PROGRESS,
  fullName: '',
  startTime: props.time,
  specialist: props.specialistId && specialistsStore.specialists.find(({ id }) => id === props.specialistId), // TODO: Use specialistsStore.byId
  procedures: [],
  description: '',
  hasRemindSMS: false,
  hasCreationSMS: false,
})

if (props.defaultStatus)
  form.value.status = props.defaultStatus

if (form.value.status !== IN_QUEUE) {
  form.value.hasRemindSMS = smsStore.settings?.hasRemindSMS
  form.value.hasCreationSMS = smsStore.settings?.hasCreationSMS
}

const isSmsAuthorize = computed(() => {
  return smsStore.isAuthorize
})

const specialists = computed(() => {
  return specialistsStore.specialists
})

const procedures = computed(() => {
  return form.value.specialist?.procedures ?? []
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

onMounted(() => {
  fetchAvailableTime()
})

async function submit() {
  const isValid = await validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await appointmentsStore.create(form.value)

    popupStore.hide()
  }
  catch (err: any) {
    if (err.code === 400) {
      await toastsStore.show({
        type: 'error',
        title: err.message,
      })

      return
    }

    throw err
  }
  finally {
    await scheduleStore.fetch()

    isLoading.value = false
  }
}

async function fetchAvailableTime() {
  availableHours.value = []

  if (!form.value.specialist?.id || duration.value === 0)
    return

  availableHours.value = await api.appointments.availableTime({
    date: form.value.date.format('YYYY-MM-DD'),
    specialistId: form.value.specialist.id,
    duration: duration.value,
  })
}

function checkStartTime() {
  const startTimeIndex = availableHours.value.indexOf(form.value.startTime)

  if (startTimeIndex === -1) {
    // @ts-expect-error
    form.value.startTime = null
  }
}

async function validate() {
  const { procedures } = form.value

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
      title="Новий запис"
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
        v-if="isSmsAuthorize"
        v-model:has-remind-sms="form.hasRemindSMS"
        v-model:has-creation-sms="form.hasCreationSMS"
        class="appointment-popup__notify"
        type="new"
      />

      <AppointmentAdditionalSettings
        v-model:source="form.source"
        class="appointment-popup__additional-settings"
        type="new"
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
          Додати запис
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
            Додати запис
          </UiButton>
        </UiContainer>
      </FixedPanel>
    </form>
  </div>
</template>
