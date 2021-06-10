<template>
  <div class="settings-page-section">
    <div class="settings-page-section__text">
      <UiText
        size="l"
        responsive
        class="settings-page-section__title"
      >
        {{ title }}
      </UiText>

      <UiText
        v-if="subTitle"
        size="m"
        responsive
        class="settings-page-section__sub-title"
      >
        {{ subTitle }}
      </UiText>
    </div>

    <div
      v-if="$slots.append"
      class="settings-page-section__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: {
      type: String,
      required: true
    },

    subTitle: {
      type: String,
      default: undefined
    }
  }
})
export default class Section extends Vue {
  readonly title: string
  readonly subTitle?: string
}
</script>

<style lang="scss" src="./Section.scss"></style>
