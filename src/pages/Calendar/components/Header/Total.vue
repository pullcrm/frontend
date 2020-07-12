<template>
  <div class="calendar-header-total">
    <div class="calendar-header-total__value">
      <p>Заработок: <strong>5850 грн</strong></p>
      <UiIcon
        name="arrow/down"
        size="xs"
      />
    </div>

    <div class="calendar-header-total__select">
      <div class="calendar-header-total__item">
        <div>
          <p>Сотрудник:</p>
          <strong>Богдан Царик</strong>
        </div>

        <div>
          <p>Количество клиентов:</p>
          <strong>8</strong>
        </div>

        <div>
          <p>Заработок:</p>
          <strong>1200 грн</strong>
        </div>
      </div>

      <div class="calendar-header-total__item">
        <div>
          <p>Всех клиентов:</p>
          <strong>22</strong>
        </div>

        <div>
          <p>Итого:</p>
          <strong>5850 грн</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '@/components/Icon.vue'

@Component({
  components: {
    UiIcon
  }
})
export default class Total extends Vue {

}
</script>

<style lang="scss">
  .calendar-header-total {
    @include ui-typo-14;

    position: relative;

    &__value {
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 16px;
      border: 1px solid #d3d3d3;
      border-radius: 4px;
      cursor: pointer;

      strong {
        font-weight: 500;
      }

      .ui-icon {
        margin-left: 5px;
      }
    }

    &__select {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 4;
      display: none;
      padding: 16px;
      background: #fff;
      border-radius: 4px;
      box-shadow: $shadow;
    }

    &__item {
      @include ui-typo-12;

      cursor: pointer;

      & > div {
        display: flex;
        justify-content: space-between;
        white-space: nowrap;

        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }

      &:not(:last-child) {
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid $ui-black-20;
      }

      p {
        width: 140px;
      }
    }

    &:hover {
      .calendar-header-total__select {
        display: block;
      }
    }
  }
</style>
