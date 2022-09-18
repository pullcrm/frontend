<script lang="ts" setup>
// https://vue3datepicker.com/installation/
import Datepicker from '@vuepic/vue-datepicker'

// inheritAttrs: false,
</script>

<template>
  <div class="date-picker">
    <Datepicker
      v-bind="$attrs"
      locale="uk"
      inline
      auto-apply
      month-name-format="long"
      :enable-time-picker="false"
      :month-change-on-scroll="false"
    />
  </div>
</template>

<style lang="scss">
.date-picker {
  --calendar-cell-size: 35px;

  $dp__cell_size: var(--calendar-cell-size);

  @import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';

  .dp__theme_light {
    --dp-menu-border-color: transparent;
    --dp-primary-color: #{$ui-blue-brand};
  }

  .dp__main {
    font-family: inherit;
  }

  .dp__calendar_header {
    font-weight: 500;
    font-size: 14px;
    color: #9797a0;
  }

  .dp__month_year_select {
    text-transform: capitalize;
  }

  .dp__calendar_header_separator {
    display: none;
  }
}
</style>
