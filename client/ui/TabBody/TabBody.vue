<template>
  <div
    v-if="!lazy || isActive"
    class="ui-tab-body"
    :class="{ 'ui-tab-body_active': isActive }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: null
    },

    lazy: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    isActive () {
      return this.$parent.activeTab === this.$vnode.key
    }
  }
}
</script>

<style lang="scss">
  .ui-tab-body {
    display: none;

    &_active {
      display: block;
    }
  }
</style>
