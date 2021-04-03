<template>
  <div class="sortable-list">
    <template
      v-for="item in items"
    >
      <slot :item="item" />
    </template>
  </div>
</template>

<script lang="ts">
// TODO: Need refactor
// https://github.com/Traxo7/vue-sortable-list/blob/master/src/index.js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  provide () {
    return {
      sortableList: () => {
        return this
      }
    }
  }
})
export default class SortableList extends Vue {
  readonly items: any[]

  draggingElement = null
  draggingElementIndex = null

  isBefore (el1, el2) {
    if (el2.parentNode === el1.parentNode) {
      for (let cur = el1.previousSibling; cur; cur = cur.previousSibling) {
        if (cur === el2) {
          return true
        }
      }
    }
    return false
  }

  update (items) {
    this.$emit('update', items)
  }
}
</script>
