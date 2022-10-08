<script lang="ts" setup>
defineProps({
  tag: {
    type: String,
    default: 'div',
  },

  to: {
    type: [Object, String],
    default: null,
  },

  icon: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Component
    :is="to ? 'RouterLink' : tag"
    class="navbar-item"
    :to="to"
  >
    <UiIcon
      :name="icon"
      size="s"
    />

    <span class="navbar-item__name">
      {{ name }}
    </span>
  </Component>
</template>

<style lang="scss" src="./NavbarItem.scss"></style>
