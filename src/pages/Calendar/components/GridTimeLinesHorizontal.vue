<template>
  <div
    class="css-grid-row-line"
    :style="gridArea"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  props: {
    rowName: {
      type: String,
      required: true
    }
  }
})
export default class CssGridItem extends Vue {
  rowName: string

  get row () {
    return this.rowName + 1
  }

  get gridArea () {
    return {
      gridColumn: '1 / -1',
      gridRow: `${this.rowName}-start / ${this.rowName}-end`
    }
  }
}
</script>

<style lang="scss">
.css-grid-row-line {
  position: relative;
  border-bottom: 1px solid #f1f1f1;
}
</style>
