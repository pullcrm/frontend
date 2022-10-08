<script lang="ts" setup>
import TimePickerBadge from './TimePickerBadge.vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },

  hours: {
    type: Array,
    required: true,
  },

  theme: {
    type: String,
    default: 'primary',
  },
})

defineEmits(['pick'])

// readonly hours
// readonly theme: 'primary' | 'secondary'

const isVisible = computed(() => {
  return props.hours.length > 0
})
</script>

<template>
  <div
    v-if="isVisible"
    :class="[
      'full-widget-pick-date-page-time-picker-group',
      `full-widget-pick-date-page-time-picker-group_theme_${theme}`,
    ]"
  >
    <UiIcon
      size="l"
      :name="icon"
      class="full-widget-pick-date-page-time-picker-group__icon"
    />

    <div class="full-widget-pick-date-page-time-picker-group__badges">
      <TimePickerBadge
        v-for="(hour, index) in hours"
        :key="index"
        :hour="hour"
        class="full-widget-pick-date-page-time-picker-group__badge"
        @click="$emit('pick', hour)"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./TimePickerGroup.scss"></style>
