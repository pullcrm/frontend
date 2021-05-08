<template>
  <div
    class="ui-carousel"
    data-test="ui-carousel"
  >
    <div
      ref="inner"
      class="ui-carousel__inner"
      data-test="ui-carousel-inner"
    >
      <slot />
    </div>

    <div
      class="ui-carousel__controls"
    >
      <button
        v-show="hasNextSlide"
        class="ui-carousel__next"
        data-test="ui-carousel-next"
        type="button"
        @click="next"
      >
        <slot name="control:next">
          <UiIcon
            name="outlined/arrow-right"
            size="s"
            inline
          />
        </slot>
      </button>

      <button
        v-show="hasPrevSlide"
        class="ui-carousel__prev"
        data-test="ui-carousel-prev"
        type="button"
        @click="prev"
      >
        <slot name="control:prev">
          <UiIcon
            name="outlined/arrow-left"
            size="s"
            inline
          />
        </slot>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { scrollToElement } from '~/utils/scroll-to'

@Component
export default class Carousel extends Vue {
  slides: HTMLElement[] = []
  slidesVisibility = new Map()
  visibleSlideIndexes: number[] = []

  $refs: {
    inner: HTMLElement
  }

  get slidesCount () {
    return this.slides.length
  }

  get firstVisibleSlideIndex () {
    return Math.min(...this.visibleSlideIndexes)
  }

  get lastVisibleSlideIndex () {
    return Math.max(...this.visibleSlideIndexes)
  }

  get hasPrevSlide () {
    return this.visibleSlideIndexes.length > 0 && !this.visibleSlideIndexes.includes(0)
  }

  get hasNextSlide () {
    return this.visibleSlideIndexes.length > 0 && !this.visibleSlideIndexes.includes(this.slidesCount - 1)
  }

  mounted () {
    const observer = new IntersectionObserver(this.onChangeVisibility, {
      root: this.$refs.inner,
      threshold: 0.99
    })

    this.slides = [...this.$el.querySelectorAll('.ui-carousel-item')] as HTMLElement[]

    this.slides.forEach((element) => {
      observer.observe(element)

      this.slidesVisibility.set(element, false)
    })

    this.$on('hook:beforeDestroy', () => {
      observer.disconnect()

      this.slidesVisibility.clear()
    })
  }

  onChangeVisibility (entries: IntersectionObserverEntry[]) {
    entries.forEach(({ target, isIntersecting }) => {
      this.slidesVisibility.set(target, isIntersecting)
    })

    this.updateVisibleSlideIndexes()
  }

  next () {
    return this.slideTo(this.lastVisibleSlideIndex + 1, { align: 'left' })
  }

  prev () {
    return this.slideTo(this.firstVisibleSlideIndex - 1, { align: 'right' })
  }

  slideTo (index, options: { align: 'right' | 'left' }) {
    const { align } = options

    const innerElement = this.$refs.inner
    const slideElement = this.slides[index]

    let horizontalOffset = 0

    if (align === 'right') {
      horizontalOffset = (innerElement.offsetWidth - slideElement.offsetWidth) * -1
    }

    return scrollToElement(slideElement, {
      elementToScroll: innerElement,
      verticalOffset: 0,
      horizontalOffset,
      cancelOnUserAction: true
    })
  }

  updateVisibleSlideIndexes () {
    this.visibleSlideIndexes = this.slides.reduce((accum, slideElement, index) => {
      if (this.slidesVisibility.get(slideElement)) {
        accum.push(index)
      }

      return accum
    }, [])
  }
}
</script>

<style lang="scss" src="./Carousel.scss"></style>
