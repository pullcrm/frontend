<template>
  <div
    :class="[
      'schedule-calendar-grid-vertical-line',
      {'_last' : isLast}]"
    :style="gridArea"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  props: {
    name: {
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
  name: string
  index: number

  get specialists () {
    return this.$store.state.employee.specialists
  }

  get isLast () {
    return this.index + 1 === this.specialists.length
  }

  get gridArea () {
    return {
      gridColumn: `${this.name}-end / ${this.name}-end`,
      gridRow: '1 / -1'
    }
  }
}
</script>

<style lang="scss">
.schedule-calendar-grid-vertical-line {
  position: relative;
  z-index: 8;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background: $ui-black-40;
    content: '';
  }
}
</style>
