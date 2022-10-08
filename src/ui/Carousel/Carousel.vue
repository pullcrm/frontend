<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

import { scrollToElement } from 'utils/scroll-to'

let slides = reactive([] as HTMLElement[])
const visibleSlideIndexes = reactive([] as number[])
const slidesVisibility = reactive(new Map())

const inner = ref(null)

const slidesCount = computed(() => {
  return slides.length
})

const firstVisibleSlideIndex = computed(() => {
  return Math.min(...visibleSlideIndexes.value)
})

const lastVisibleSlideIndex = computed(() => {
  return Math.max(...visibleSlideIndexes.value)
})

const hasPrevSlide = computed(() => {
  return visibleSlideIndexes.value?.length > 0 && !visibleSlideIndexes.value?.includes(0)
})

const hasNextSlide = computed(() => {
  return visibleSlideIndexes.value?.length > 0 && !visibleSlideIndexes.value?.includes(slidesCount.value - 1)
})

onMounted(() => {
  const observer = new IntersectionObserver(onChangeVisibility, {
    root: inner.value,
    threshold: 0.99,
  })

  slides = [...inner.value.querySelectorAll('.ui-carousel-item')] as HTMLElement[]

  slides.forEach((element) => {
    observer.observe(element)

    slidesVisibility.set(element, false)
  })

  onBeforeUnmount(() => {
    observer.disconnect()

    slidesVisibility.clear()
  })
})

function onChangeVisibility(entries: IntersectionObserverEntry[]) {
  entries.forEach(({ target, isIntersecting }) => {
    slidesVisibility.set(target, isIntersecting)
  })

  updateVisibleSlideIndexes()
}

function next() {
  return slideTo(lastVisibleSlideIndex.value + 1, { align: 'left' })
}

function prev() {
  return slideTo(firstVisibleSlideIndex.value - 1, { align: 'right' })
}

function slideTo(index, options: { align: 'right' | 'left' }) {
  const { align } = options

  const innerElement = inner.value
  const slideElement = slides[index]

  let horizontalOffset = 0

  if (align === 'right')
    horizontalOffset = (innerElement.offsetWidth - slideElement.offsetWidth) * -1

  return scrollToElement(slideElement, {
    elementToScroll: innerElement,
    verticalOffset: 0,
    horizontalOffset,
    cancelOnUserAction: true,
  })
}

function updateVisibleSlideIndexes() {
  visibleSlideIndexes.value = slides.reduce((accum, slideElement, index) => {
    if (slidesVisibility.get(slideElement))
      accum.push(index)

    return accum
  }, [])
}
</script>

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
      <div
        v-show="hasNextSlide"
        class="ui-carousel__next"
        data-test="ui-carousel-next"
        @click="next"
      >
        <slot name="control:next">
          <UiIcon
            name="outlined/arrow-right"
            size="s"
            inline
          />
        </slot>
      </div>

      <div
        v-show="hasPrevSlide"
        class="ui-carousel__prev"
        data-test="ui-carousel-prev"
        @click="prev"
      >
        <slot name="control:prev">
          <UiIcon
            name="outlined/arrow-left"
            size="s"
            inline
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Carousel.scss"></style>
