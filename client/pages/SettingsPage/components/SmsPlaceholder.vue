<template>
  <div class="settings-page-sms-placeholder">
    <div class="settings-page-sms-placeholder__text">
      <UiText
        size="l"
        responsive
        class="settings-page-sms-placeholder__title"
      >
        {{ title }}
      </UiText>

      <UiText
        v-if="subTitle"
        size="m"
        responsive
        class="settings-page-sms-placeholder__sub-title"
      >
        {{ subTitle }}
      </UiText>
    </div>

    <div
      v-if="$slots.append"
      class="settings-page-sms-placeholder__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
// TODO: Rename component
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: {
      type: String,
      default: ''
    },

    subTitle: {
      type: String,
      default: ''
    }
  }
})
export default class SmsPlaceholder extends Vue {
  readonly title?: string
  readonly subTitle?: string
}
</script>

<style lang="scss" src="./SmsPlaceholder.scss"></style>
