<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    default: 'm',
  },
})

const icon = computed(() => `/ui-icons/${props.name}.svg`)
</script>

<template>
  <i
    :class="[
      'ui-icon',
      `ui-icon_size_${size}`,
      `ui-icon_${name.replace('/', '-')}`,
    ]"
    :style="{
      backgroundImage: `url(${icon})`,
    }"
  >
    <svg>
      <use :xlink:href="`${icon}#__THIS_ID_NEEDS_FOR_UI_ICON_COMPONENT__`" />
    </svg>
  </i>
</template>

<style lang="scss" src="./Icon.scss"></style>
