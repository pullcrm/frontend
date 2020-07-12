<template>
  <div
    :class="['css-grid-column-line', type, {'_last' : isLast}]"
    :style="gridArea"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  props: {
    columnName: {
      type: String,
      required: true
    },

    index: {
      type: Number,
      required: true
    }
  }
})
export default class CssGridItem extends Vue {
  columnName: string
  index: number

  get hours () {
    return this.$store.getters.hours
  }

  get isLast () {
    return this.index + 1 === this.hours.length
  }

  get gridArea () {
    return {
      gridColumn: `${this.columnName}-start / ${this.columnName}-end`,
      gridRow: '1 / -1'
    }
  }

  get type () {
    return this.index % 2 === 0 ? 'hour' : 'minutes'
  }
}
</script>

<style lang="scss">
.css-grid-column-line {
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    background: #f1f1f1;
    content: '';
  }

  &.minutes {
    &::before {
      background: #f9f9f9;
    }
  }

  &._last {
    &::after {
      position: absolute;
      top: 0;
      right: -2px;
      bottom: 0;
      width: 1px;
      background: #f1f1f1;
      content: '';
    }
  }
}
</style>
