<script lang="ts" setup>
import type Tabs from '../Tabs/Tabs.vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },

  size: {
    type: String,
    required: true,
  },
})

const tabs = inject<typeof Tabs | undefined>('tabs', undefined)

// readonly size:
// | 's'
// | 'm'
// | 'l'

const isActive = computed(() => {
  if (tabs)
    return tabs.activeTab === this.$vnode.key

  return props.active
})

function onSelect() {
  if (tabs)
    return tabs.selectTab(this.$vnode.key)
}
</script>

<template>
  <UiText
    tag="a"
    href="#"
    class="ui-tab-button"
    :class="[
      { 'ui-tab-button_active': isActive },
    ]"
    :size="size"
    v-bind="$attrs"
    @click.prevent="onSelect"
  >
    <slot />
  </UiText>
</template>

<style lang="scss" src="./TabButton.scss"></style>
