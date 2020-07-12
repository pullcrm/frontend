<template>
  <div class="calendar-staff-panel">
    <div class="calendar-staff-panel__inner">
      <div class="calendar-staff-panel__head">
        <slot name="head">
          <p>Сотрудники</p>
        </slot>
      </div>

      <div class="calendar-staff-panel__list">
        <slot name="list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class StaffPanel extends Vue {

}
</script>

<style lang="scss">
  .calendar-staff-panel {
    width: 190px;
    min-width: 190px;
    padding-right: 8px;

    &__head {
      display: flex;
      align-items: center;
      height: 48px;

      p {
        color: #0e0e0e;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
</style>
