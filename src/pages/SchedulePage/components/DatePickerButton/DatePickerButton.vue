<script lang="ts" setup>
import ScheduleDatePicker from '../ScheduleDatePicker.vue'
</script>

<template>
  <UiPopover
    size="m"
    placement="top_end"
    class="schedule-page-date-picker-button"
  >
    <UiButton
      class="schedule-page-date-picker-button__button"
      size="l"
      theme="blue"
      left-icon="outlined/calendar"
    />

    <template #body="{ close }">
      <ScheduleDatePicker
        @input="close"
      />
    </template>
  </UiPopover>
</template>

<style lang="scss" src="./DatePickerButton.scss"></style>
