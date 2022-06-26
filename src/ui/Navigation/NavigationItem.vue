<script lang="ts" setup>
// inheritAttrs: false,

defineProps({
  item: {
    type: Object,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['input'])
</script>

<template>
  <Component
    :is="item.to ? 'RouterLink' : 'a'"
    href="#"
    class="ui-navigation-item"
    :class="{
      'ui-navigation-item__active': isActive,
    }"
    v-bind="item"
    @click.prevent="$emit('input', item)"
  >
    {{ item.name }}
  </Component>
</template>

<style lang="scss">
.ui-navigation-item {
  @include ui-typo-16;

  padding: 4px 16px;
  color: $ui-black-80;
  white-space: nowrap;
  border-radius: 50px;
  cursor: pointer;

  &__active,
  &.router-link-exact-active {
    color: $ui-black-100;
    background: $ui-black-20;
  }
}
</style>
