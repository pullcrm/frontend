<template>
  <div
    v-if="isVisible"
    class="css-grid-placeholder"
    :class="{_active: dragZoneOver}"
    :style="gridArea"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class GridItemPlaceholder extends Vue {
  get isVisible () {
    return this.$store.getters['calendar/isDragged']
  }

  get hours () {
    return this.$store.getters.hours
  }

  get dragZone () {
    return this.$store.state.calendar.dragZone
  }

  get dragZoneOver () {
    return this.$store.state.calendar.dragZoneOver
  }

  get dragElement () {
    return this.$store.state.calendar.dragElement
  }

  get drugElementLength () {
    return this.$store.getters['calendar/drugElementLength']
  }

  get drugElementTileStart () {
    return this.$store.getters['calendar/drugElementTileStart']
  }

  get areaColumnStart () {
    return this.$store.getters['calendar/nextDrugElementTileStart']
  }

  get areaColumnEnd () {
    return this.$store.getters['calendar/nextDrugElementTileEnd']
  }

  get areaColumnRow () {
    return this.dragZone.row
  }

  get gridArea () {
    return {
      gridColumn: `${this.areaColumnStart}-start / ${this.areaColumnEnd}-end`,
      gridRow: this.areaColumnRow
    }
  }
}
</script>

<style lang="scss">
  .css-grid-placeholder {
    z-index: 5;
    border: 2px dashed green;

    &._active {
      background: rgba(green, 0.1);
    }
  }
</style>
