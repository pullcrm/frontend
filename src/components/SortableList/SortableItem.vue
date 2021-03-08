<template>
  <div
    class="sortable-item"
    @dragstart="dragStart"
    @dragend.prevent="dragEnd"
    @dragenter.prevent="dragenter"
  >
    <slot />
  </div>
</template>

<script lang="ts">
// TODO: Need refactor
import Vue from 'vue'
import Component from 'vue-class-component'

import SortableList from './SortableList.vue'

@Component({
  inject: ['sortableList'],

  props: {
    handleSelector: {
      type: String,
      default: null
    }
  }
})
export default class SortableItem extends Vue {
  readonly handleSelector: string | null

  readonly sortableList!: () => SortableList

  mounted () {
    const handleElement = this.handleSelector && this.$el.querySelector(`${this.handleSelector}`)

    if (!handleElement) {
      return this.setDraggable()
    }

    handleElement.addEventListener('mousedown', this.setDraggable, { passive: true })

    this.$once('hook:beforeDestroy', () => {
      handleElement.removeEventListener('mousedown', this.setDraggable)
    })
  }

  setDraggable () {
    this.$el.setAttribute('draggable', 'true')
  }

  dragStart (event) {
    const list = this.sortableList()

    event.dataTransfer.effectsAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('text/plain', null)

    list.draggingElement = this.$el
    list.draggingElementIndex = [...this.$el.parentElement.children].indexOf(this.$el)
  }

  dragEnd () {
    this.$el.setAttribute('draggable', 'false')

    const list = this.sortableList()

    if (!list.draggingElement) return

    const from = list.draggingElementIndex
    const to = [...list.draggingElement.parentElement.children].indexOf(list.draggingElement)

    const items = [...list.items]
    items.splice(to, 0, items.splice(from, 1)[0])

    list.update(items)

    setTimeout(() => {
      list.draggingElement = null
      list.draggingElementIndex = null
    }, 0)
  }

  dragenter () {
    const list = this.sortableList()

    // if (!list.draggingElement) return

    // if (![...list.draggingElement.parentElement.children].includes(this.$el)) return

    if (list.isBefore(list.draggingElement, this.$el)) {
      this.$el.parentNode.insertBefore(list.draggingElement, this.$el)
    } else {
      this.$el.parentNode.insertBefore(list.draggingElement, this.$el.nextSibling)
    }
  }
}
</script>

<style lang="scss">
  .sortable-item {
    //
  }
</style>
