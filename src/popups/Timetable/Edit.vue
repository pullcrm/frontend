<script lang="ts" setup>
import { form, getFormatDates, v$, workingHours } from './index'

import { setTime } from '~/utils/time'
import { api } from '~/boot/api'

const props = defineProps({
  dates: {
    type: Array,
    default: null,
  },

  timeWork: {
    type: Object,
    default: null,
  },

  onReload: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['close'])

const isLoading = ref(false)
const formatDates = getFormatDates(props.dates as Date[])

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    const requests = formatDates.map((date: any) => {
      const timeWork = props.timeWork[date][0]

      return api.timetable.put(timeWork.specialistId, {
        id: timeWork.id,
        startDateTime: setTime(timeWork.startDateTime, form.value.startTime).format('YYYY-MM-DD HH:mm:ss'),
        endDateTime: setTime(timeWork.endDateTime, form.value.endTime).format('YYYY-MM-DD HH:mm:ss'),
      })
    })

    await Promise.all(requests)

    await props.onReload()

    close()
  }
  finally {
    isLoading.value = false
  }
}

async function onDelete() {
  try {
    isLoading.value = true

    const requests = formatDates.map((date: any) => {
      const timeWork = props.timeWork[date][0]

      return api.timetable.delete(timeWork.specialistId, {
        id: timeWork.id,
      })
    })

    await Promise.all(requests)

    await props.onReload()

    close()
  }
  finally {
    isLoading.value = false
  }
}

async function close() {
  emit('close')
}

// Set selected date value
form.value = {
  startTime: props.timeWork[formatDates[0]][0]?.start,
  endTime: props.timeWork[formatDates[0]][0]?.end,
}
</script>

<template>
  <UiPopup
    class="timetable-popup"
    @close="$emit('close')"
  >
    <UiTitle
      class="timetable-popup__title"
      size="s"
    >
      Змінити графік
    </UiTitle>

    <UiText
      class="timetable-popup__dates"
      size="m"
      responsive
    >
      <strong>Вибрані дати:</strong> {{ formatDates.join(', ') }}
    </UiText>

    <form @submit.prevent="submit">
      <UiFormValidator :validate="v$">
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Початок"
            required
            :error="getFieldError('startTime')"
          >
            <UiSelect
              v-model="form.startTime"
              required
              :options="workingHours.from"
              placeholder="Вибрати час початку"
              @update:model-value="resetFieldError('startTime')"
            />
          </UiField>

          <UiField
            label="Закінчення"
            required
            :error="getFieldError('endTime')"
          >
            <UiSelect
              v-model="form.endTime"
              required
              :options="workingHours.to"
              placeholder="Вибрати час закінчення"
              @update:model-value="resetFieldError('endTime')"
            />
          </UiField>

          <div class="timetable-popup__actions">
            <UiButton
              type="submit"
              size="l"
              theme="blue"
              :loading="isLoading"
            >
              Підтвердити
            </UiButton>

            <UiButton
              size="l"
              theme="danger-outlined"
              :loading="isLoading"
              @click="onDelete"
            >
              Видалити графік
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<style lang="scss" src="./styles.scss"></style>
