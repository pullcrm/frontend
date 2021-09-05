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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ScheduleDatePicker from '../ScheduleDatePicker.vue'

@Component({
  components: {
    ScheduleDatePicker
  }
})
export default class DatePickerButton extends Vue {}
</script>

<style lang="scss" src="./DatePickerButton.scss"></style>
