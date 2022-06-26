<template>
  <div
    class="fixed-panel"
    :class="{ _visible: isVisible }"
    data-test="fixed-panel"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    threshold: {
      type: Number,
      default: 0.66
    },

    showWhenInvisible: {
      type: String,
      required: true
    }
  }
})
export default class FixedPanel extends Vue {
  readonly threshold: number
  readonly showWhenInvisible: string

  isVisible = false
  visibilityList = new Map()

  mounted () {
    if (this.showWhenInvisible) {
      const observer = new IntersectionObserver(this.onChangeVisibility, {
        threshold: this.threshold
      })

      ;[...document.querySelectorAll(this.showWhenInvisible)].forEach((element) => {
        observer.observe(element)

        this.visibilityList.set(element, false)
      })

      this.$on('hook:beforeDestroy', () => {
        observer.disconnect()

        this.visibilityList.clear()
      })
    }
  }

  onChangeVisibility (entries: IntersectionObserverEntry[]) {
    entries.forEach(({ target, isIntersecting }) => {
      this.visibilityList.set(target, isIntersecting)
    })

    this.isVisible = ![...this.visibilityList.values()].some(value => value)
  }
}
</script>

<style lang="scss" src="./FixedPanel.scss"></style>
