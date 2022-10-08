<script lang="ts" setup>
import { form, v$, workingHours } from './index'
import { formatDate, toDate } from '~/utils/date-time'
import { setTime } from '~/utils/time'
import { api } from '~/boot/api'

const props = defineProps({
  timeOff: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const toastsStore = useToastsStore()
const scheduleStore = useScheduleStore()
const specialistsStore = useSpecialistsStore()

const date = ref(toDate(props.timeOff.startDateTime).toDate())
const isLoading = ref(false)

form.value = {
  id: props.timeOff.id,
  startTime: props.timeOff.startTime,
  endTime: props.timeOff.endTime,

  specialist: specialistsStore.byId(props.timeOff.specialistId),
  description: props.timeOff.description,
}

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    const endDateTime = setTime(date.value, form.value.endTime).format('YYYY-MM-DD HH:mm:ss')
    const startDateTime = setTime(date.value, form.value.startTime).format('YYYY-MM-DD HH:mm:ss')

    await api.timeOff.update(form.value.id as number, {
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

async function remove() {
  isLoading.value = true

  try {
    await api.timeOff.delete(form.value.id as number)
    await scheduleStore.fetchTimeOffs()

    toastsStore.show({ title: 'Видалено!' })

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
    class="time-off-edit-popup"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="time-off-edit-popup__title"
      size="s"
    >
      Змінити
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        :validate="v$"
      >
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
            class="time-off-edit-popup__popover"
            size="m"
            placement="bottom_start"
          >
            <UiField label="Дата">
              <UiInput
                :model-value="formatDate(date, 'D MMMM')"
                readonly
                left-icon="outlined/pencil"
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
              @input="resetFieldError('description')"
            />
          </UiField>

          <div class="time-off-edit-popup__actions">
            <UiButton
              type="submit"
              size="l"
              theme="blue"
              :loading="isLoading"
            >
              Зберегти
            </UiButton>

            <UiButton
              size="l"
              theme="danger-outlined"
              :loading="isLoading"
              @click="remove"
            >
              Видалити
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<style lang="scss">
  .time-off-edit-popup {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;

        &:last-child {
          margin-top: 16px;
        }
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
