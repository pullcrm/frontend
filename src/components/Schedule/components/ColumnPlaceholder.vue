<template>
  <div class="schedule-column-placeholder">
    <UiButton
      class="schedule-column-placeholder__add-more"
      theme="green"
      left-icon="person/add"
      size="l"
      @click.native="addSpecialist"
    >
      Добавить сотрудника
    </UiButton>

    <div class="schedule-column-placeholder__placeholder" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ScheduleColumnPlaceholder extends Vue {
  addSpecialist () {
    this.$store.dispatch('popup/show', 'specialist-new')
  }
}
</script>

<style lang="scss">
  .schedule-column-placeholder {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: $SCHEDULE_APPOINTMENT_WIDTH;

    &__add-more {
      @include ui-shadow-4;

      width: 100%;
      height: 68px;
      white-space: nowrap;
      border-radius: 0;
    }

    &__placeholder {
      flex: 1;
      background-color: $ui-gray-brand;
      background-image: url('~@/assets/svg/disabled-time-pattern.svg');
    }
  }
</style>
