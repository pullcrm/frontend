<template>
  <UiPanel
    class="info-panel"
    :class="[
      `_theme_${theme}`
    ]"
    size="m"
    responsive
  >
    <div class="info-panel__icon">
      <UiIcon
        :name="icon"
        size="s"
      />
    </div>

    <div class="info-panel__text">
      <slot />
    </div>

    <div
      v-if="info || $slots.append"
      class="info-panel__append"
    >
      <slot name="append">
        <UiTooltip
          class="info-panel__info"
          placement="top"
          :text="info"
        >
          <UiIcon
            name="outlined/info"
            size="s"
          />
        </UiTooltip>
      </slot>
    </div>
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
export default class InfoPanel extends Vue {
  readonly icon! : string
  readonly theme!:
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'

  readonly info?: string
}
</script>

<style lang="scss" src="./InfoPanel.scss"></style>
