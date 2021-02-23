<template>
  <div class="ui-calendar-days-of-week">
    <span
      v-for="(day, index) in daysOfWeek"
      :key="index"
      :value="day"
    >
      {{ day }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class DaysOfWeek extends Vue {
  get daysOfWeek () {
    return ['П', 'В', 'С', 'Ч', 'П', 'С', 'В']
  }
}
</script>

<style lang="scss">
  .ui-calendar-days-of-week {
    @include ui-typo-14;

    display: flex;
    justify-content: space-between;
    padding: 4px;
    color: $ui-black-60;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
  }
</style>
