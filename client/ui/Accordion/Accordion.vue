<template>
  <div
    class="ui-accordion"
    :class="[
      `ui-accordion_theme_${theme}`,
      `ui-accordion_size_${size}`
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    theme: {
      type: String,
      default: 'primary'
    },

    size: {
      type: String,
      default: 'm'
    },

    collapsible: {
      type: Boolean,
      default: false
    }
  }
})
export default class Accordion extends Vue {
  readonly theme: string
  readonly size: string
  readonly collapsible: boolean

  openedItems: number[] = []

  isItemOpened (name) {
    return this.openedItems.includes(name)
  }

  toggleItem (name) {
    if (this.isItemOpened(name)) {
      this.closeItem(name)
      return
    }

    if (this.collapsible) {
      this.closeAllItems()
    }

    this.openItem(name)
  }

  closeAllItems () {
    this.openedItems = []
  }

  closeItem (name) {
    this.openedItems = this.openedItems.filter((itemName) => itemName !== name)
  }

  openItem (name) {
    this.openedItems.push(name)
  }
}
</script>

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
