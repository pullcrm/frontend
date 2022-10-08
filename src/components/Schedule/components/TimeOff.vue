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
  return props.timeOff.description.slice(0, 15) || 'Перерва'
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
    :data-text="description"
    @dblclick="edit"
  >
    {{ description }}
  </UiText>
</template>

<style lang="scss">
  .schedule-timeoff {
    @include background-image-disabled-placeholder;

    z-index: 7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: $ui-black-60;
    background-color: $ui-black-10;
    box-shadow:
      0 1px 0 $ui-black-40,
      0 -1px 0 $ui-black-40;

    &:after {
      content: attr(data-text);
      -webkit-text-stroke: 4px $ui-black-10;
      position: absolute;
      z-index: -1
    }
  }
</style>
