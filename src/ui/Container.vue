<script lang="ts" setup>
const props = defineProps({
  narrow: {
    type: Boolean,
    default: false,
  },
})

const type = computed(() => {
  if (props.narrow)
    return 'narrow'

  return 'wide'
})
</script>

<template>
  <div
    class="ui-container"
    :class="[`ui-container_${type}`]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.ui-container {
  &_wide {
    @include ui-container;
  }

  &_narrow {
    @include ui-container-narrow;
  }
}
</style>
