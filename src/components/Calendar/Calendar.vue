<template>
  <div class="calendar-inline">
    <VCalendar
      :value="value"
      is-inline
      @input="input"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import VCalendar from 'v-calendar/lib/components/date-picker.umd'

@Component({
  components: {
    VCalendar
  },

  props: {
    value: {
      type: Date,
      default: null
    }
  }
})
export default class Calendar extends Vue {
  input (date) {
    if (date) {
      this.$emit('input', date)
    }
  }
}
</script>

<style lang="scss">
  .calendar-inline {
    .vc-container {
      --header-padding: 0 0 8px 0;
      --arrows-padding: 0;
      --weekday-padding: 0 0 8px 0;

      width: 100%;
      font-family: inherit;
      background: transparent;
      border: none;
      border-radius: 0;
    }

    .vc-title {
      @include ui-typo-18;

      color: $ui-black-100;
      text-transform: capitalize;
    }

    // Title arrow
    .vc-text-gray-600 {
      color: $ui-black-100;
    }

    .vc-weekday {
      @include ui-typo-14;

      color: $ui-black-60;
      font-weight: 400;
    }

    .vc-day {
      @include ui-typo-14;

      color: $ui-black-100;
      font-weight: 400;
    }

    .vc-day-layer .vc-highlight {
      background: $ui-green-brand;
    }

    .is-today {
      .vc-day-content {
        background: $ui-black-20;
      }

      .vc-day-layer + .vc-day-content {
        background: transparent;
      }
    }

    .vc-rounded-full {
      border-radius: 4px;
    }
  }
</style>
