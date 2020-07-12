<template>
  <div
    class="css-grid-tile"
    :style="gridArea"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    area: {
      type: Object,
      required: true
    }
  }
})
export default class GridTile extends Vue {
  area

  get gridArea () {
    const { row, column } = this.area

    return {
      gridColumn: `${column}-start / ${column}-end`,
      gridRow: `${row}-start / ${row}-end`
    }
  }

  get areaColumnStart () {
    return this.$store.getters['calendar/nextDrugElementTileStart']
  }

  get areaColumnEnd () {
    return this.$store.getters['calendar/nextDrugElementTileEnd']
  }

  mounted () {
    const element = this.$el as HTMLElement

    element.addEventListener('dragenter', this.dropZoneEnterHandler)
    element.addEventListener('dragover', this.dropZoneOverHandler)
    element.addEventListener('dragleave', this.dropZoneLeaveHandler)
    element.addEventListener('drop', this.dropZoneDropHandler)

    this.$once('hook:beforeDestroy', () => {
      element.removeEventListener('dragenter', this.dropZoneEnterHandler)
      element.removeEventListener('dragover', this.dropZoneOverHandler)
      element.removeEventListener('dragleave', this.dropZoneLeaveHandler)
      element.removeEventListener('drop', this.dropZoneDropHandler)
    })
  }

  dropZoneEnterHandler (e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
      this.$store.commit('calendar/SET_DRAG_ZONE', {
        row: this.area.row,
        column: this.area.column
      })

      e.preventDefault()
    }
  }

  dropZoneOverHandler (e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
      this.$store.commit('calendar/SET_DRAG_ZONE_OVER', true)

      e.preventDefault()
    }
  }

  dropZoneLeaveHandler (e) {
    if (
      e.dataTransfer.types.includes('type/dragged-box') &&
      e.relatedTarget !== null &&
      e.currentTarget !== e.relatedTarget.closest('.drop-zone')
    ) {
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget

      this.$store.commit('calendar/SET_DRAG_ZONE_OVER', false)
    }
  }

  dropZoneDropHandler (e) {
    this.$store.commit('calendar/SET_DRAG_ZONE_OVER', false)

    const draggedElement = document.querySelector('._dragged') as HTMLElement

    draggedElement.style.gridArea = ''

    draggedElement.style.gridColumn = `${this.areaColumnStart}-start / ${this.areaColumnEnd}-end`
    draggedElement.style.gridRow = this.area.row

    e.preventDefault()
  }
}
</script>

<style lang="scss">
  .css-grid-tile {
    z-index: 5;
    padding: 8px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40% auto;
    cursor: pointer;
    opacity: 0.4;

    &:hover {
      background-image: url('https://icons.iconarchive.com/icons/icons8/ios7/512/User-Interface-Plus-icon.png');
    }
  }
</style>
