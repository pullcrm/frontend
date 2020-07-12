<template>
  <div
    class="schedule-calendar-tile"
    :class="{'_active': isOpened}"
    :style="gridArea"
  >
    <!-- @dragenter="dropZoneEnterHandler"
      @dragover="dropZoneOverHandler"
      @dragleave="dropZoneLeaveHandler"
      @drop.prevent="dropZoneDropHandler" -->
    <UiDropdownMenu
      class="schedule-calendar-tile-popover"
      placement="top-center"
      @open="onOpen"
    >
      <template #inner="{ open, close }">
        <div
          class="schedule-calendar-tile-popover"
          @click="isOpened ? close() : open()"
          @dblclick="$emit('appointment', tile)"
        />
      </template>

      <UiDropdownGroup
        :name="`Начало: ${tile.time}`"
      >
        <UiText
          size="m"
          left-icon="plus/circle"
          @click.native="$emit('appointment', tile)"
        >
          Добавить запись
        </UiText>

        <UiText
          size="m"
          left-icon="slash"
          @click.native="$emit('time-off', tile)"
        >
          Закрыть запись
        </UiText>
      </UiDropdownGroup>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { slugFromTime } from '@/utils/time'

@Component({
  props: {
    tile: {
      type: Object,
      required: true
    }
  }
})
export default class Tile extends Vue {
  readonly tile

  isOpened = false

  get row () {
    return slugFromTime(this.tile.time)
  }

  get column () {
    return `employee-${this.tile.employeeId}`
  }

  get gridArea () {
    return {
      gridColumn: `${this.column}-start / ${this.column}-end`,
      gridRow: `${this.row}-start / ${this.row}-end`
    }
  }

  onOpen (opened) {
    this.isOpened = opened
  }

  // get dropTimeObject () {
  //   return this.$store.getters['drugAndDrop/dropTimeObject']
  // }

  // dropZoneEnterHandler (e) {
  //   if (e.dataTransfer.types.includes('type/dragged-box')) {
  //     this.$store.commit('drugAndDrop/SET_DRAG_ZONE', this.tile)

  //     e.preventDefault()
  //   }
  // }

  // dropZoneOverHandler (e) {
  //   if (e.dataTransfer.types.includes('type/dragged-box')) {
  //     this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', true)

  //     e.preventDefault()
  //   }
  // }

  // dropZoneLeaveHandler (e) {
  //   if (
  //     e.dataTransfer.types.includes('type/dragged-box') &&
  //     e.relatedTarget !== null &&
  //     e.currentTarget !== e.relatedTarget.closest('.drop-zone')
  //   ) {
  //     // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget

  //     this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', false)
  //   }
  // }

  // dropZoneDropHandler () {
  //   // this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', false)
  // }
}
</script>

<style lang="scss">
  .schedule-calendar-tile {
    position: relative;
    z-index: 5;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 60%;
      opacity: 0.4;
      content: '';
    }

    &._active {
      z-index: 99;
    }

    &:hover {
      &::before {
        background-image: url('https://icons.iconarchive.com/icons/icons8/ios7/512/User-Interface-Plus-icon.png');
      }
    }
  }

  .schedule-calendar-tile-popover {
    width: 100%;
    height: 100%;
    cursor: pointer;

    &__inner {
      width: 100%;
      height: 100%;
    }
  }
</style>
