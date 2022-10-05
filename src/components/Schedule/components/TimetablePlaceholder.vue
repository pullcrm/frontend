<script lang="ts" setup>
defineEmits(['add'])

const gridArea = computed(() => {
  return {
    gridRow: '1 / 999',
    gridColumn: 'start / end',
  }
})
</script>

<template>
  <a
    href="#"
    class="schedule-timetable-placeholder"
    :style="gridArea"
    data-test="timetable-placeholder"
    @click.prevent="$emit('add')"
  >
    <UiText
      size="m"
      strong
      responsive
      left-icon="solid/clock-afternoon-fill"
    >
      Додати розклад
    </UiText>
  </a>
</template>

<style lang="scss">
.schedule-timetable-placeholder {
  @include background-image-disabled-placeholder(45deg);

  padding: 16px 0;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: $ui-black-80;
  box-shadow:
    0 1px 0 $ui-black-40,
    0 -1px 0 $ui-black-40;
}
</style>
