<template>
  <UiPanel
    class="dashboard-page-number"
    :class="[
      `_theme_${theme}`
    ]"
    size="m"
    responsive
  >
    <div class="dashboard-page-number__icon">
      <UiIcon
        :name="icon"
        size="m"
      />
    </div>

    <div class="dashboard-page-number__text">
      <UiText
        size="l"
        responsive
      >
        {{ name }}
      </UiText>

      <UiTitle
        size="m"
        responsive
      >
        {{ value | price }}
      </UiTitle>
    </div>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: {
      type: String,
      required: true
    },

    value: {
      type: [Number, String],
      default: 0
    },

    theme: {
      type: String,
      default: 'blue'
    },

    icon: {
      type: String,
      required: true
    }
  }
})
export default class Number extends Vue {
  readonly icon! : string
  readonly name!: string
  readonly value!: number
  readonly theme!:
  | 'blue'
  | 'green'
  | 'yellow'
}
</script>

<style lang="scss" src="./Number.scss"></style>
