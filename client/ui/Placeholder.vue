<template>
  <div
    class="ui-placeholder"
  >
    <div
      v-if="image"
      class="ui-placeholder__image"
    >
      <img :src="image">
    </div>

    <div class="ui-placeholder__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <div
      v-if="text || $slots.text"
      class="ui-placeholder__text"
    >
      <slot name="text">
        {{ text }}
      </slot>
    </div>

    <div
      v-if="subText"
      class="ui-placeholder__sub-text"
    >
      {{ subText }}
    </div>

    <div
      v-if="$slots.default"
      class="ui-placeholder__body"
    >
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

    image: {
      type: String,
      default: undefined
    },

    text: {
      type: String,
      default: undefined
    },

    subText: {
      type: String,
      default: undefined
    }
  }
})
export default class Placeholder extends Vue {
  readonly image?: string
  readonly title: string
  readonly text?: string
  readonly subText?: string
}
</script>

<style lang="scss">
  .ui-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    &__image {
      height: 240px;
      margin-bottom: 24px;

      img {
        height: 100%;
        margin: 0 auto;
      }
    }

    &__title {
      @include ui-typo-24;

      width: 100%;
      max-width: 448px;
      font-weight: 600;
    }

    &__text {
      @include ui-typo-16;

      width: 100%;
      max-width: 448px;
      margin-top: 4px;
      font-weight: 400;
    }

    &__sub-text {
      @include ui-typo-14;

      max-width: 448px;
      margin-top: 8px;
      color: #828282;
    }

    &__body {
      width: 100%;
      margin-top: 24px;

      .ui-button + .ui-button {
        margin-top: 24px;
      }
    }
  }
</style>
