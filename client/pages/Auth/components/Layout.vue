<template>
  <div class="auth-page-layout">
    <div class="auth-page-layout__inner">
      <div class="auth-page-layout__header">
        <img
          class="auth-page-layout__logo"
          src="~/assets/logos/logo_new.svg"
        >

        <UiTitle
          size="xl"
          responsive
        >
          {{ title }}
        </UiTitle>

        <UiText
          size="m"
          responsive
        >
          {{ subTitle }}
        </UiText>
      </div>

      <slot />
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
export default class AuthLayout extends Vue {
  readonly title!: string
  readonly subTitle?: string
}
</script>

<style lang="scss" src="./Layout.scss"></style>
