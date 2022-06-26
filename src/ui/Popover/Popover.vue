<script lang="ts" setup>
import type { Placement } from 'utils/placement'
import { computePlacement } from 'utils/placement'

const props = defineProps({
  theme: {
    type: String,
    default: 'white',
  },

  size: {
    type: String,
    default: 'm',
  },

  placement: {
    type: String,
    default: 'right_middle',
  },

  opened: {
    type: Boolean,
    default: false,
  },

  text: {
    type: String,
    default: undefined,
  },

  clickable: {
    type: Boolean,
    default: true,
  },
})

const getContainer: () => HTMLElement = inject('getUiTooltipContainer', () => document.body)

watch(
  () => props.opened,
  val => val ? open() : close(),
)

// readonly theme!:
// | 'dark'
// | 'white'
// | 'custom'

// readonly size!:
// | 's'
// | 'm'
// | 'l'
// | 'custom'

// readonly placement!: Placement

const isOpened = ref(false)

const computedPlacement = ref(props.placement)

const root = ref(null)
const body = ref(null)

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
    const placement = computePlacement(body.value, {
      reference: root.value as HTMLElement,
      container: container.getBoundingClientRect(),
      placement: props.placement as Placement,
    })

    computedPlacement.value = placement
  }
}

defineExpose({ open, close, toggle })

onClickOutside(root, () => {
  if (props.clickable && isOpened.value)
    close()
})
</script>

<template>
  <div
    ref="root"
    class="ui-popover"
    :class="[
      `ui-popover_size_${size}`,
      `ui-popover_theme_${theme}`,
      `ui-popover_${computedPlacement.split('_')[0]}`,
      `ui-popover_${computedPlacement}`,
      { 'ui-popover_opened': isOpened },
    ]"
    @click.prevent="clickable && toggle()"
  >
    <slot
      :is-opened="isOpened"
    />

    <div class="ui-popover__arrow" />

    <div
      ref="body"
      class="ui-popover__body"
      @click.stop
    >
      <slot
        name="body"
        :close="close"
      >
        <UiText
          size="m"
          responsive
        >
          {{ text }}
        </UiText>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" src="./Popover.scss"></style>
