<template>
  <div class="appointment-total">
    <div class="appointment-total__date">
      <UiText size="m">
        Дата
      </UiText>

      <UiPopover
        size="s"
        placement="top-right"
      >
        <template #default="{ open, close, isOpened }">
          <UiText
            tag="UiLink"
            size="m"
            theme="primary"
            @click.native.prevent="isOpened ? close() : open()"
          >
            {{ customDate | formatDate('D MMMM') }}
          </UiText>
        </template>

        <template #body>
          <Calendar
            v-model="customDate"
            class="schedule-sidebar__calendar"
          />
        </template>
      </UiPopover>
    </div>

    <div
      class="appointment-total__date"
    >
      <UiText size="m">
        Время выполнения
      </UiText>

      <UiText
        v-if="!startTime || procedures.length === 0"
        size="m"
      >
        Укажите данные
      </UiText>

      <UiText
        v-else
        size="m"
      >
        {{ fromTime }} - {{ toTime }}
      </UiText>
    </div>

    <div class="appointment-total__sum">
      <UiTitle
        size="m"
      >
        Сумма
      </UiTitle>

      <UiTitle
        class="appointment-total__price"
        size="m"
      >
        <Contenteditable
          :value="total"
          @input="updateTotalPrice"
        /> грн
      </UiTitle>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'

import { getProceduresDuration } from '@/logics/appointment'

import { toDate } from '@/utils/date-time'

import Contenteditable from '@/ui/Contenteditable.vue'

import Calendar from '@/components/Calendar/Calendar.vue'

@Component({
  components: {
    Calendar,
    Contenteditable
  },

  props: {
    procedures: {
      type: Array,
      default: () => {
        return []
      }
    },

    date: {
      type: Object,
      default: null
    },

    total: {
      type: Number,
      default: 0
    },

    startTime: {
      type: String,
      default: null
    }
  }
})
export default class Total extends Vue {
  readonly date
  readonly total
  readonly startTime
  readonly procedures

  get customDate (): Date {
    if (this.date) {
      return new Date(this.date.toString())
    }

    return new Date(this.$store.state.schedule.date)
  }

  set customDate (val) {
    this.$emit('update:date', toDate(String(val)))
  }

  get totalTime () {
    return getProceduresDuration({ procedures: this.procedures })
  }

  get fromTime () {
    return this.startTime
  }

  get toTime () {
    const steps = this.totalTime / TIME_STEP

    return this.$time.shiftTimeUpBySteps(this.fromTime, steps)
  }

  updateTotalPrice (val) {
    this.$emit('update:total', Number.parseInt(val) || 0)
  }
}
</script>

<style lang="scss">
  .appointment-total {
    margin: 16px 0;

    &__sum,
    &__date {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    &__price {
      color: #21ab39;
    }
  }
</style>
