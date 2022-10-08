<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: null,
  },

  lazy: {
    type: Boolean,
    default: true,
  },
})

const isActive = computed(() => {
  // TODO: FIXME:
  return false
  // return this.$parent.activeTab === this.$vnode.key
})
</script>

<template>
  <div
    v-if="!lazy || isActive"
    class="ui-tab-body"
    :class="{ 'ui-tab-body_active': isActive }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
  .ui-tab-body {
    display: none;

    &_active {
      display: block;
    }
  }
</style>
