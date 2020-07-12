<template>
  <div class="calendar-header">
    <div class="calendar-header__left">
      <Total />
    </div>

    <div class="calendar-header__right">
      <div class="calendar-header__tomorrow">
        Завтра
      </div>

      <date-picker
        v-model="date"
        :shortcuts="shortcuts"
        placeholder="Select date"
        :clearable="false"
      />

      <div class="calendar-header__button">
        <p>Добавить запись</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Total from './Total.vue'

// https://github.com/mengxiong10/vue2-datepicker
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

@Component({
  components: {
    Total,
    DatePicker
  }
})
export default class CalendarHeader extends Vue {
  date = new Date()

  shortcuts = [
    {
      text: 'Today',
      onClick () {
        const date = new Date()
        // return a Date
        return date
      }
    },
    {
      text: 'Yesterday',
      onClick () {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      }
    }
  ]
}
</script>

<style lang="scss">
  .calendar-header {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &__right {
      display: flex;
      align-items: center;
    }

    &__tomorrow {
      @include ui-typo-14;

      margin-right: 16px;
      cursor: pointer;
    }

    &__button {
      @include ui-typo-14;

      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      margin-left: 16px;
      padding: 0 24px;
      color: #fff;
      background: #1676ee;
      border-radius: 4px;
      cursor: pointer;
    }

    .mx-datepicker {
      width: 150px;
      height: 36px;
      border: 1px solid #d3d3d3;
      border-radius: 4px;
      cursor: pointer;

      input {
        background: transparent;
        border: none;
        box-shadow: none;
        cursor: pointer;
      }
    }
  }
</style>
