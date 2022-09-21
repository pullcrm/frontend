<script lang="ts" setup>
const timetableStore = useTimetableStore()

const workingHours = computed(() => {
  return timetableStore.maxWorkingHours.filter((_, index) => index % 2 === 0)
})
</script>

<template>
  <div class="schedule-timeline">
    <div
      v-for="time in workingHours"
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

    @media (max-width: ($ui-laptop - 1px)) {
      flex-basis: var(--time-line-width);
    }
  }
</style>
