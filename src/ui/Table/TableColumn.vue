<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },

  align: {
    type: String,
    default: 'left',
  },
})
</script>

<template>
  <td
    :data-name="name"
    :align="align"
  >
    <slot />
  </td>
</template>

<style lang="scss">
  //
</style>
