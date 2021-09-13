<template>
  <DatePicker
    inline
    time-title-format="YYYY-MM"
    :lang="{
      monthFormat: 'MMMM'
    }"
    prefix-class="custom-ui"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
// https://github.com/mengxiong10/vue2-datepicker
import Vue from 'vue'
import Component from 'vue-class-component'

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'

@Component({
  inheritAttrs: false,

  components: {
    DatePicker
  }
})
export default class DatePicker2 extends Vue {}
</script>

<style lang="scss">
$namespace: 'custom-ui';

$default-color: $ui-black-90;
$primary-color: $ui-blue-brand;

$calendar-in-range-background-color: $ui-blue-10;

@import '~vue2-datepicker/scss/index.scss';

.custom-ui-datepicker-main {
  font-family: inherit;
  border: none;
}

.custom-ui-calendar {
  padding: 0;
}

.custom-ui-btn,
.custom-ui-time-header,
.custom-ui-calendar-header,
.custom-ui-calendar-header-label {
  @include ui-typo-16;

  text-transform: capitalize;
}

.custom-ui-table-date {
  .cell {
    &._closed {
      color: $ui-red-danger;
    }

    &.today {
      position: relative;

      &:hover {
        color: $ui-blue-brand;
      }

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid $ui-blue-60;
        content: '';
      }
    }

    &.not-current-month {
      color: $ui-black-50;
    }

    &.active {
      color: $ui-white;

      &:hover {
        color: $ui-white;
      }
    }
  }

  td,
  th {
    @include ui-typo-14;
  }

  th {
    color: $ui-black-60;
  }
}

.custom-ui-calendar-header {
  height: 24px;
  margin-bottom: 6px;
}

.custom-ui-btn-icon-double-left,
.custom-ui-btn-icon-double-right {
  display: none;
}

.custom-ui-icon-left,
.custom-ui-icon-right {
  &::before {
    width: 16px;
    height: 16px;
  }
}

.custom-ui-calendar + .custom-ui-calendar {
  display: none;
}
</style>
