<script lang="ts" setup>
import { isTouchDevice } from 'utils/device'
import type { Placement } from 'utils/placement'
import { computePlacement } from 'utils/placement'

import UiText from '../Text/Text.vue'

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
  },

  placement: {
    type: String,
    default: 'right_middle',
  },

  clickable: {
    type: Boolean,
    default: true,
  },

  text: {
    type: String,
    default: undefined,
  },

  opened: {
    type: Boolean,
    default: false,
  },
})

const getContainer: () => HTMLElement = inject('getUiTooltipContainer', () => document.body)

watch(
  () => props.opened,
  opened => opened ? open() : close(),
)

const isOpened = ref(false)

const computedPlacement = ref(props.placement)

const root = ref<HTMLElement | null>(null)
const body = ref<HTMLElement | null>(null)

onMounted(() => {
  requestAnimationFrame(() => {
    if (props.opened)
      open()
  })
})

function open() {
  onComputePlacement()

  isOpened.value = true
}

function close() {
  isOpened.value = false
}

function toggle() {
  isOpened.value ? close() : open()
}

function onComputePlacement() {
  const container = getContainer()

  if (body.value && root.value) {
    const currentPlacement = computePlacement(body.value, {
      reference: root.value,
      container: container.getBoundingClientRect(),
      placement: props.placement as Placement,
    })

    computedPlacement.value = currentPlacement
  }
}

onClickOutside(root, () => {
  if (props.clickable && isOpened.value)
    close()
})
</script>

<template>
  <div
    ref="root"
    class="ui-tooltip"
    :class="[
      `ui-tooltip_theme_${theme}`,
      `ui-tooltip_${computedPlacement.split('_')[0]}`,
      `ui-tooltip_${computedPlacement}`,
      { 'ui-tooltip_opened': isOpened },
    ]"
    @click.prevent="clickable && toggle()"
    @mouseout="clickable && !isTouchDevice() && close()"
    @mouseover="clickable && !isTouchDevice() && open()"
  >
    <slot />

    <div class="ui-tooltip__arrow" />

    <UiText
      ref="body"
      class="ui-tooltip__body"
      @click.stop=""
    >
      <slot name="body">
        {{ text }}
      </slot>
    </UiText>
  </div>
</template>

<style lang="scss" src="./Tooltip.scss"></style>
