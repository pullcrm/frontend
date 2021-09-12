<template>
  <UiPanel
    size="m"
    class="landing-home-page-review"
  >
    <img
      src="~/assets/svg/quote.svg"
      alt="quote"
      class="landing-home-page-review__quote"
    >

    <UiText
      size="m"
      class="landing-home-page-review__text"
      v-html="review.content"
    />

    <div class="landing-home-page-review__author">
      <div class="landing-home-page-review__image">
        <img
          :src="review.image"
          :alt="review.name"
        >
      </div>

      <UiTitle
        size="s"
        class="landing-home-page-review__name"
      >
        {{ review.name }}
      </UiTitle>

      <UiText
        size="m"
        class="landing-home-page-review__info"
      >
        {{ review.info }}
      </UiText>
    </div>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ILandingReview } from './index'

@Component({
  props: {
    review: {
      type: Object,
      required: true
    }
  }
})
export default class Review extends Vue {
  readonly review!: ILandingReview
}
</script>

<style lang="scss" src="./Review.scss"></style>
