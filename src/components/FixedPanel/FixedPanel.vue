<script lang="ts" setup>
const props = defineProps({
  threshold: {
    type: Number,
    default: 0.66,
  },

  showWhenInvisible: {
    type: String,
    required: true,
  },
})

const isVisible = ref(false)
const visibilityList = ref(new Map())

onMounted(() => {
  if (props.showWhenInvisible) {
    const observer = new IntersectionObserver(onChangeVisibility, {
      threshold: props.threshold,
    })

    // @ts-expect-error
    ;[...document.querySelectorAll(props.showWhenInvisible)].forEach((element) => {
      observer.observe(element)

      visibilityList.value.set(element, false)
    })

    onBeforeUnmount(() => {
      observer.disconnect()

      visibilityList.value.clear()
    })
  }
})

function onChangeVisibility(entries: IntersectionObserverEntry[]) {
  entries.forEach(({ target, isIntersecting }) => {
    visibilityList.value.set(target, isIntersecting)
  })

  isVisible.value = ![...visibilityList.value.values()].some(value => value)
}
</script>

<template>
  <div
    class="fixed-panel"
    :class="{ _visible: isVisible }"
    data-test="fixed-panel"
  >
    <slot />
  </div>
</template>

<style lang="scss" src="./FixedPanel.scss"></style>
