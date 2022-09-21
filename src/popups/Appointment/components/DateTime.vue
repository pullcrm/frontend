<script lang="ts" setup>
import { IN_QUEUE } from '~/constants/appointment'
import dayjs from '~/utils/dayjs'
import { minutesToTime, setTime } from '~/utils/time'
import { formatDate } from '~/utils/date-time'

import DatePicker from '~/components/DatePicker/DatePicker.vue'

const props = defineProps({
  date: {
    type: Object,
    default: null,
  },

  status: {
    type: String,
    required: true,
  },

  startAt: {
    type: String,
    default: null,
  },

  duration: {
    type: Number,
    required: true,
  },

  availableHours: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:date', 'update:startAt'])

const scheduleStore = useScheduleStore()
const timetableStore = useTimetableStore()

const isDataTimeRequired = computed(() => {
  return props.status !== IN_QUEUE
})

const customDate = computed<Date>({
  get() {
    if (props.date)
      return new Date(props.date.toString())

    return new Date(scheduleStore.date)
  },

  set(val) {
    emit('update:date', dayjs(val))
  },
})

const endTime = computed(() => {
  return setTime(new Date(), props.startAt).add(props.duration, 'minute').format('HH:mm')
})
</script>

<template>
  <div class="appointment-popup-date-time">
    <div class="appointment-popup-date-time__inner  ui-grid">
      <UiPopover
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4',
        ]"
        size="m"
        placement="bottom_start"
      >
        <UiField label="Дата">
          <UiInput
            :model-value="formatDate(customDate, 'D MMMM YYYY')"
            readonly
            left-icon="outlined/calendar-blank"
          />
        </UiField>

        <template #body>
          <DatePicker v-model="customDate" />
        </template>
      </UiPopover>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4',
        ]"
        label="Час початку"
      >
        <UiSelect
          :model-value="startAt"
          :options="availableHours"
          :required="isDataTimeRequired"
          left-icon="outlined/clock"
          placeholder="00:00"
          @update:model-value="
            $emit('update:startAt', $event)
          "
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4',
        ]"
        label="Тривалість"
      >
        <UiInput
          :model-value="minutesToTime(duration)"
          readonly
          disabled
          placeholder="00:00"
          left-icon="outlined/clock-afternoon"
        />
      </UiField>
    </div>

    <UiText
      v-if="startAt && duration > 0"
      class="appointment-popup-date-time__time-end"
      size="m"
      responsive
    >
      Завершується в {{ endTime }}
    </UiText>
  </div>
</template>

<style lang="scss">
  .appointment-popup-date-time {
    &__time-end {
      margin-top: 8px;
      color: $ui-black-60;
      text-align: right;
    }

    .ui-select__body {
      min-width: auto;
    }
  }
</style>
