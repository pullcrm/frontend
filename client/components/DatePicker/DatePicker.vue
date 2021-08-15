<template>
  <DatePicker
    inline
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

.custom-ui-calendar + .custom-ui-calendar {
  margin-left: 12px;
  padding-left: 12px;
}
</style>
