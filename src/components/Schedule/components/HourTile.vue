<template>
  <div
    class="schedule-hour-tile"
    :class="[
      {'_active': isOpened},
      {'_is-minute': isMinute}
    ]"
    :style="gridArea"
  >
    <!-- @dragenter="dropZoneEnterHandler"
      @dragover="dropZoneOverHandler"
      @dragleave="dropZoneLeaveHandler"
      @drop.prevent="dropZoneDropHandler" -->
    <UiDropdownMenu
      class="schedule-hour-tile-popover"
      placement="top-center"
      @open="onOpen"
    >
      <template #inner="{ open, close }">
        <div
          class="schedule-hour-tile-popover"
          @click="isOpened ? close() : open()"
          @dblclick="addAppointment"
        />
      </template>

      <UiDropdownGroup
        :name="`Начало: ${hour}`"
      >
        <UiText
          size="m"
          left-icon="plus/circle"
          @click.native="addAppointment"
        >
          Добавить запись
        </UiText>

        <UiText
          size="m"
          left-icon="slash"
          @click.native="addTimeOff"
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
    hour: {
      type: String,
      required: true
    },

    specialistId: {
      type: Number,
      required: true
    }
  }
})
export default class HourTile extends Vue {
  readonly hour: string
  readonly specialistId: number

  isOpened = false

  get isMinute () {
    return Number(this.hour.split(':')[1]) % 2 === 0
  }

  get gridArea () {
    const row = slugFromTime(this.hour)

    return {
      gridRow: `${row}-start / ${row}-end`,
      gridColumn: 'start / end'
    }
  }

  onOpen (opened) {
    this.isOpened = opened
  }

  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        time: this.hour,
        employeeId: this.specialistId
      }
    })
  }

  addTimeOff () {
    this.$store.dispatch('popup/show', {
      name: 'time-off-new',
      props: {
        time: this.hour,
        employeeId: this.specialistId
      }
    })
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
  .schedule-hour-tile {
    position: relative;
    z-index: 5;
    border-bottom: 1px solid $ui-black-40;

    &._is-minute {
      border-color: #eaeaea;
    }

    &:last-child {
      border: none;
    }

    &._active {
      z-index: 99;
    }

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

    &:hover {
      &::before {
        background-image: url('https://icons.iconarchive.com/icons/icons8/ios7/512/User-Interface-Plus-icon.png');
      }
    }
  }

  .schedule-hour-tile-popover {
    width: 100%;
    height: 100%;
    cursor: pointer;

    &__inner {
      width: 100%;
      height: 100%;
    }
  }
</style>
