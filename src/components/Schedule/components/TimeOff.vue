<script lang="ts" setup>
import { slugFromTime } from '~/utils/time'

const props = defineProps({
  timeOff: {
    type: Object,
    required: true,
  },
})

const popupStore = usePopupStore()

const description = computed(() => {
  return props.timeOff.description.slice(0, 15)
})

const from = computed(() => {
  return slugFromTime(props.timeOff.startTime)
})

const to = computed(() => {
  return slugFromTime(props.timeOff.endTime)
})

const gridArea = computed(() => {
  return {
    gridRow: `${from.value}-start / ${to.value}-start`,
    gridColumn: 'start / end',
  }
})

function edit() {
  popupStore.show({
    name: 'time-off-edit',
    props: {
      timeOff: props.timeOff,
    },
  })
}
</script>

<template>
  <UiText
    class="schedule-timeoff"
    size="l"
    responsive
    :style="gridArea"
    @dblclick="edit"
  >
    {{ description }}
  </UiText>
</template>

<style lang="scss">
  .schedule-timeoff {
    @include ui-text-border($ui-black-10, 2px);

    z-index: 7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    color: $ui-black-60;
    background-color: $ui-black-10;
    background-image: url('~/assets/svg/disabled-time-pattern.svg');
    background-position: bottom right;
    background-size: $SCHEDULE_ROW_HEIGHT;
    box-shadow:
      0 1px 0 $ui-black-40,
      0 -1px 0 $ui-black-40;
  }
</style>
