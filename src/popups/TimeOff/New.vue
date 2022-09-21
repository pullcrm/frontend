<script lang="ts" setup>
import { form, v$, workingHours } from './index'
import { formatDate } from '~/utils/date-time'
import { setTime } from '~/utils/time'
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
})

const emit = defineEmits(['close'])

const scheduleStore = useScheduleStore()
const specialistsStore = useSpecialistsStore()

const date = ref(new Date(scheduleStore.date))
const isLoading = ref(false)

form.value = {
  startTime: props.time,
  endTime: '',
  specialist: specialistsStore.byId(props.specialistId),
  description: '',
}

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
</script>

<template>
  <UiPopup
    class="time-off-new-popup"
    @close="$emit('close')"
  >
    <UiTitle
      class="time-off-new-popup__title"
      size="s"
    >
      Додати перерву
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
              :options="specialistsStore.specialists"
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

          <UiField
            label="Час початку"
            required
            :error="getFieldError('startTime')"
          >
            <UiSelect
              v-model="form.startTime"
              :options="workingHours.from"
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
              :options="workingHours.to"
              placeholder="Вибрати час закінчення"
              @update:model-value="resetFieldError('endTime')"
            />
          </UiField>

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
