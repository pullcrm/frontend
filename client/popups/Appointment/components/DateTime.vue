<template>
  <div class="appointment-popup-date-time">
    <div class="appointment-popup-date-time__inner  ui-grid">
      <UiPopover
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4'
        ]"
        size="m"
        placement="bottom_start"
      >
        <UiField label="Дата">
          <UiInput
            :value="customDate | formatDate('D MMMM YYYY')"
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
          'ui-grid-item_tablet_4'
        ]"
        label="Час початку"
      >
        <UiSelect
          :value="startAt"
          :options="availableHours"
          :required="isDataTimeRequired"
          left-icon="outlined/clock"
          placeholder="00:00"
          @input="
            $emit('update:startAt', $event),
            $emit('resetFieldError', 'timeStart')
          "
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4'
        ]"
        label="Тривалість"
      >
        <UiInput
          :value="duration | minutesToTime"
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
      Завершується в {{ toTime }}
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '~/constants'

import { AppointmentStatuses, IN_QUEUE } from '~/constants/appointment'

import dayjs from '~/utils/dayjs'
import { shiftTimeUpBySteps } from '~/utils/time'

import DatePicker from '~/components/DatePicker/DatePicker.vue'

@Component({
  components: {
    DatePicker
  },

  props: {
    date: {
      type: Object,
      default: null
    },

    status: {
      type: String,
      required: true
    },

    startAt: {
      type: String,
      default: null
    },

    duration: {
      type: Number,
      required: true
    },

    availableHours: {
      type: Array,
      default: () => []
    }
  }
})
export default class DateTime extends Vue {
  readonly date
  readonly status: AppointmentStatuses
  readonly startAt
  readonly duration: number
  readonly availableHours

  get isDataTimeRequired () {
    return this.status !== IN_QUEUE
  }

  get customDate (): Date {
    if (this.date) {
      return new Date(this.date.toString())
    }

    return new Date(this.$typedStore.state.schedule.date)
  }

  set customDate (date) {
    this.$emit('update:date', dayjs(date))
  }

  get workingHours () {
    return this.$typedStore.getters['timetable/workingHours']
  }

  get toTime () {
    const steps = this.duration / TIME_STEP

    return shiftTimeUpBySteps(this.workingHours, this.startAt, steps)
  }
}
</script>

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
