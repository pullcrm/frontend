<template>
  <div
    v-if="reviews.length > 0"
    class="landing-home-page-reviews"
  >
    <UiTitle
      class="landing-home-page-reviews__title"
      size="m"
    >
      Отзывы наших клиентов
    </UiTitle>

    <UiCarousel
      class="landing-home-page-reviews__carousel"
    >
      <UiCarouselItem
        v-for="(review, index) in reviews"
        :key="index"
      >
        <Review
          :review="review"
        />
      </UiCarouselItem>
    </UiCarousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Review from './Review.vue'

@Component({
  components: {
    Review
  }
})
export default class Reviews extends Vue {
  get reviews () {
    return []
  }
}
</script>

<style lang="scss" src="./Reviews.scss"></style>
