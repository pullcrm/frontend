<script lang="ts" setup>
import { form, getFormatDates, v$, workingHours } from './index'

import { setTime } from '~/utils/time'
import { api } from '~/boot/api'

const props = defineProps({
  specialistId: {
    type: Number,
    default: null,
  },

  dates: {
    type: Array,
    default: null,
  },
})

const emit = defineEmits(['close'])

const timetableStore = useTimetableStore()

const isLoading = ref(false)
const formatDates = getFormatDates(props.dates as Date[])

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    const dates = props.dates.map((date: any) => {
      return {
        startDateTime: setTime(date, form.value.startTime).format('YYYY-MM-DD HH:mm:ss'),
        endDateTime: setTime(date, form.value.endTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    })

    await api.timetable.add(props.specialistId, {
      timeWork: dates,
    })

    await timetableStore.fetchAll()

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
    class="timetable-popup"
    @close="$emit('close')"
  >
    <UiTitle
      class="timetable-popup__title"
      size="s"
    >
      Додати графік
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
              Додати
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<style lang="scss" src="./styles.scss"></style>
