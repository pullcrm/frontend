<script lang="ts" setup>
import useValidate, { ValidateMaxLength, ValidateRequired } from 'validation/index'
import { setTime } from '~/utils/time'
import DatePicker from '~/components/DatePicker/DatePicker.vue'
import { api } from '~/boot/api'
import { formatDate } from '~/utils/date-time'

const props = defineProps({
  specialistId: {
    type: Number,
    default: null,
  },

  time: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['close'])

const scheduleStore = useScheduleStore()
const timetableStore = useTimetableStore()
const specialistsStore = useSpecialistsStore()

const isLoading = ref(false)
const isCloseDay = ref(false)

const form = ref({
  endTime: '',
  startTime: props.time,
  specialist: props.specialistId && specialistsStore.specialists.find(({ id }) => id === props.specialistId),
  description: '',
})

const date = ref(new Date(scheduleStore.date))

const workingHours = computed(() => {
  return timetableStore.workingHours
})

const workingHoursForTimeEnd = computed(() => {
  if (!form.value.startTime)
    return []

  const startTimeIndex = workingHours.value.indexOf(form.value.startTime)

  return workingHours.value.filter((_time, index) => {
    return startTimeIndex < index
  })
})

const validations = {
  specialist: {
    ...ValidateRequired('Виберіть спеціаліста'),
  },

  startTime: !isCloseDay.value && {
    ...ValidateRequired('Вкажіть час початку'),
  },

  endTime: !isCloseDay.value && {
    ...ValidateRequired('Вкажіть час завершения'),
  },

  description: {
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },
}

const v$ = useValidate(validations, form)

const specialists = computed(() => {
  return specialistsStore.specialists
})

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    const endDateTime = setTime(date.value, form.value.endTime).format('YYYY-MM-DD HH:mm:ss')
    const startDateTime = setTime(date.value, form.value.startTime).format('YYYY-MM-DD HH:mm:ss')

    await api.timeOff.create({
      specialistId: form.value.specialist.id,
      endDateTime,
      startDateTime,
      description: form.value.description,
    })

    await scheduleStore.fetchTimeOffs()

    close()
  }
  finally {
    isLoading.value = false
  }
}

async function close() {
  emit('close')
}

watch(
  () => isCloseDay.value,
  (val) => {
    if (val) {
      form.value.endTime = workingHours.value[workingHours.value.length - 1]
      form.value.startTime = workingHours.value[0]
    }
  },
)
</script>

<template>
  <UiPopup
    class="time-off-new-popup"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="time-off-new-popup__title"
      size="s"
    >
      Закрити запис
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator :validate="v$">
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Спеціаліст"
            required
            :error="getFieldError('specialist')"
          >
            <UiSelect
              v-model="form.specialist"
              :options="specialists"
              label-key="fullName"
              placeholder="Вибрати спеціаліста"
              :clearable="false"
              @update:model-value="resetFieldError('specialist')"
            />
          </UiField>

          <UiPopover
            class="time-off-new-popup__popover"
            size="m"
            placement="bottom_start"
          >
            <UiField label="Дата">
              <UiInput
                readonly
                left-icon="outlined/calendar-blank"
                :model-value="formatDate(date, 'D MMMM')"
              />
            </UiField>

            <template #body>
              <DatePicker v-model="date" />
            </template>
          </UiPopover>
          <UiField>
            <UiSwitch
              v-model="isCloseDay"
              size="m"
            >
              <template #append>
                <UiText
                  size="m"
                >
                  Закрити запис на весь день
                </UiText>
              </template>
            </UiSwitch>
          </UiField>

          <template
            v-if="isCloseDay === false"
          >
            <UiField
              label="Час початку"
              required
              :error="getFieldError('startTime')"
            >
              <UiSelect
                v-model="form.startTime"
                :options="workingHours"
                placeholder="Вибрати час початку"
                @update:model-value="resetFieldError('startTime')"
              />
            </UiField>

            <UiField
              label="Час закінчення"
              required
              :error="getFieldError('endTime')"
            >
              <UiSelect
                v-model="form.endTime"
                :options="workingHoursForTimeEnd"
                placeholder="Вибрати час закінчення"
                @update:model-value="resetFieldError('endTime')"
              />
            </UiField>
          </template>

          <UiField
            label="Короткий опис"
            :error="getFieldError('description')"
          >
            <UiInput
              v-model="form.description"
              tag="textarea"
              placeholder="Введіть опис"
              @update:model-value="resetFieldError('description')"
            />
          </UiField>

          <div class="time-off-new-popup__actions">
            <UiButton
              type="submit"
              size="l"
              theme="blue"
              :loading="isLoading"
            >
              Додати
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<style lang="scss">
  .time-off-new-popup {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;
      }
    }

    &__popover {
      margin: 24px 0;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
