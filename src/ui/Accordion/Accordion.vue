<script lang="ts" setup>
const props = defineProps({
  theme: {
    type: String,
    default: 'primary',
  },

  size: {
    type: String,
    default: 'm',
  },

  collapsible: {
    type: Boolean,
    default: false,
  },
})

const openedItems = ref<number[]>([])

function isItemOpened(name: number) {
  return openedItems.value.includes(name)
}

function toggleItem(name: number) {
  if (isItemOpened(name)) {
    closeItem(name)
    return
  }

  if (props.collapsible)
    closeAllItems()

  openItem(name)
}

function closeAllItems() {
  openedItems.value = []
}

function closeItem(name: number) {
  openedItems.value = openedItems.value.filter(itemName => itemName !== name)
}

function openItem(name: number) {
  openedItems.value.push(name)
}
</script>

<template>
  <div
    class="ui-accordion"
    :class="[
      `ui-accordion_theme_${theme}`,
      `ui-accordion_size_${size}`,
    ]"
  >
    <slot
      :open-item="openItem"
      :toggle-item="toggleItem"
      :is-item-opened="isItemOpened"
    />
  </div>
</template>

<style lang="scss">
  .ui-accordion {
    &_theme_primary {
      .ui-accordion-item {
        &:not(:last-of-type) {
          margin-bottom: 24px;
        }
      }
    }
  }
</style>
