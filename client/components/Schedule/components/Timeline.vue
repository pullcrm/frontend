<template>
  <div class="schedule-timeline">
    <div
      v-for="time in timeHours"
      :key="time"
      class="schedule-timeline__item"
    >
      <UiText
        size="s"
      >
        {{ time }}
      </UiText>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Timeline extends Vue {
  get workingHours () {
    return this.$typedStore.getters['timetable/workingHours']
  }

  get timeHours () {
    return this.workingHours.filter((_, index) => index % 2 === 0)
  }
}
</script>

<style lang="scss">
  .schedule-timeline {
    flex-basis: var(--time-line-width);

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: $SCHEDULE_ROW_HEIGHT;
      color: $ui-black-100;

      &:not(:last-child) {
        margin-bottom: $SCHEDULE_ROW_HEIGHT;
      }
    }

    @media (max-width: $ui-laptop - 1px) {
      flex-basis: var(--time-line-width);
      padding-top: 60px;
      border-right: 1px solid #dbdbe0;

      .schedule-timeline__item {
        &:last-child {
          display: none;
        }
      }
    }
  }
</style>
