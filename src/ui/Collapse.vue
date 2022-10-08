<script lang="ts" setup>
const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },

  maxHeight: {
    type: String,
    default: null,
  },
})

watch(
  () => props.opened,
  (opened: boolean) => {
    if (opened)
      open()
    else
      close()
  },
)

const root = ref<HTMLElement | null>(null)

function open() {
  const maxHeight = props.maxHeight || root.value?.scrollHeight

  if (root.value)
    root.value.style.maxHeight = `${maxHeight}px`
}

function close() {
  if (root.value)
    root.value.style.maxHeight = ''
}
</script>

<template>
  <div
    ref="root"
    class="ui-collapse"
    :class="{ 'ui-collapse_opened': opened }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
  .ui-collapse {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-in;
  }
</style>
