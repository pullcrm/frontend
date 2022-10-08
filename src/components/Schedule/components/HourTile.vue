<script lang="ts" setup>
import { slugFromTime } from '~/utils/time'

const props = defineProps({
  time: {
    type: String,
    required: true,
  },
})

const icon = ref<HTMLElement | null>(null)

const gridArea = computed(() => {
  const row = slugFromTime(props.time)

  return {
    gridRow: `${row}-start / ${row}-end`,
    gridColumn: 'start / end',
  }
})

defineExpose({ icon })
</script>

<template>
  <div
    class="schedule-hour-tile"
    :style="gridArea"
  >
    <div
      ref="icon"
      class="schedule-hour-tile__icon"
    >
      <UiIcon
        size="xs"
        name="outlined/plus"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./HourTile.scss"></style>
