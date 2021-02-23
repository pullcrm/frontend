<template>
  <div class="appointment-popup-date-time">
    <div class="appointment-popup-date-time__inner  ui-grid">
      <UiPopover
        class="appointment-popup-date-time__date"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4'
        ]"
        size="m"
        placement="bottom_start"
      >
        <template #default="{ toggle }">
          <UiField
            label="Дата"
            @click.native.prevent="toggle"
          >
            <UiInput
              :value="customDate | formatDate('D MMMM YYYY')"
              disabled
              left-icon="outlined/calendar-blank"
            />
          </UiField>
        </template>

        <template #body>
          <Calendar v-model="customDate" />
        </template>
      </UiPopover>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_4'
        ]"
        label="Время начала"
      >
        <UiSelect
          :value="startAt"
          required
          :options="workingHours"
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
        label="Длительность"
      >
        <UiInput
          :value="duration | minutesToTime"
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
      Завершение в {{ toTime }}
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'

import Calendar from '@/components/Calendar/Calendar.vue'

@Component({
  components: {
    Calendar
  },

  props: {
    date: {
      type: Object,
      default: null
    },

    startAt: {
      type: String,
      default: null
    },

    duration: {
      type: Number,
      required: true
    },

    workingHours: {
      type: Array,
      default: () => []
    }
  }
})
export default class DateTime extends Vue {
  readonly date
  readonly startAt
  readonly duration: number
  readonly workingHours

  get customDate (): Date {
    if (this.date) {
      return new Date(this.date.toString())
    }

    return new Date(this.$store.state.schedule.date)
  }

  set customDate (date) {
    this.$emit('update:date', date)
  }

  get toTime () {
    const steps = this.duration / TIME_STEP

    return this.$time.shiftTimeUpBySteps(this.startAt, steps)
  }
}
</script>

<style lang="scss">
  .appointment-popup-date-time {
    &__date {
      .ui-input__input {
        &:disabled {
          background: $ui-white;
        }
      }
    }

    .ui-input__input {
      &:disabled {
        color: $ui-black-100;
      }
    }

    &__time-end {
      margin-top: 8px;
      color: $ui-black-60;
      text-align: right;
    }
  }
</style>
