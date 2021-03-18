<template>
  <UiPanel
    class="number-block"
    :class="[
      `_theme_${theme}`
    ]"
    size="m"
    responsive
  >
    <div class="number-block__icon">
      <UiIcon
        :name="icon"
        size="m"
      />
    </div>

    <div class="number-block__text">
      <slot />
    </div>

    <UiTooltip
      v-if="info"
      class="number-block__info"
      placement="top"
      :text="info"
    >
      <UiIcon
        name="outlined/info"
        size="m"
      />
    </UiTooltip>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    theme: {
      type: String,
      default: 'blue'
    },

    icon: {
      type: String,
      required: true
    },

    info: {
      type: String,
      default: null
    }
  }
})
export default class NumberBlock extends Vue {
  readonly icon! : string
  readonly theme!:
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'

  readonly info?: string
}
</script>

<style lang="scss" src="./NumberBlock.scss"></style>
