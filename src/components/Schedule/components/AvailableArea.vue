<script lang="ts" setup>
import { slugFromTime } from '~/utils/time'

const props = defineProps({
  workingHours: {
    type: Array,
    required: true,
  },
})

const gridArea = computed(() => {
  const hours = props.workingHours as string[]

  return {
    gridRow: `${slugFromTime(hours[0])}-start / ${slugFromTime(hours[hours.length - 1])}-end`,
    gridColumn: 'start / end',
  }
})
</script>

<template>
  <div
    :style="gridArea"
    class="schedule-column-available-area"
  />
</template>

<style lang="scss">
.schedule-column-available-area {
  background-color: $ui-black-10;
  cursor: pointer;
  background-image: linear-gradient(
    $ui-black-40,
    $ui-black-40 1px,
    transparent 1.5px,
    transparent $SCHEDULE_ROW_HEIGHT,
    #eaeaea,
    #eaeaea #{$SCHEDULE_ROW_HEIGHT + 1px},
    transparent #{$SCHEDULE_ROW_HEIGHT + 1.5px},
    transparent #{$SCHEDULE_ROW_HEIGHT * 2}
  );
  background-size: 100% #{$SCHEDULE_ROW_HEIGHT * 2};
}
</style>
