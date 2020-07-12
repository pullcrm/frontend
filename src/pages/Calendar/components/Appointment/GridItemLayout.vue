<template>
  <div
    :class="`css-grid-item _${item.type}`"
    :style="gridArea"
  >
    <div class="css-grid-item__inner">
      <div class="css-grid-item__service">
        {{ item.service.name }}, {{ item.service.price }} грн
      </div>

      <div class="css-grid-item__name">
        {{ item.client.name }}, {{ item.client.phone }}
      </div>

      <div class="css-grid-item__menu" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { slugFromTime } from '@/utils/time.js'

import { IAppointment } from '@/types'

@Component({
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
export default class CssGridItem extends Vue {
  item: IAppointment

  get staff () {
    return this.item.staff
  }

  get hours () {
    return this.$store.getters.hours
  }

  get timeEnd () {
    return slugFromTime(this.item.time_end)
  }

  get timeStart () {
    return slugFromTime(this.item.time_start)
  }

  get gridArea () {
    return {
      gridColumn: `${this.timeStart}-start / ${this.timeEnd}-start`,
      gridRow: `${this.staff.slug}-start / ${this.staff.slug}-end`
    }
  }

  mounted () {
    const element = this.$el as HTMLElement

    element.addEventListener('dragstart', this.dragStartHandler)
    element.addEventListener('dragend', this.dragEndHandler)

    this.$once('hook:beforeDestroy', () => {
      element.removeEventListener('dragstart', this.dragStartHandler)
      element.removeEventListener('dragend', this.dragEndHandler)
    })

    element.setAttribute('draggable', 'true')
  }

  dragStartHandler (e) {
    e.dataTransfer.setData('type/dragged-box', 'dragged')

    setTimeout(() => this.$el.classList.add('_dragged'), 10)

    this.$store.commit('calendar/SET_DRAG_ELEMENT', {
      timeStart: this.item.time_start,
      timeEnd: this.item.time_end,
      layerX: e.layerX
    })
  }

  dragEndHandler () {
    this.$el.classList.remove('_dragged')

    this.$store.commit('calendar/RESET_DRAG')
  }
}
</script>

<style lang="scss">
.css-grid-item {
  z-index: 8;
  box-sizing: border-box;
  padding: 4px 2px;

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 8px 12px 8px 8px;
    color: #000;
    border-radius: 0 8px 8px 0;
    cursor: move;

    & > div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
  }

  &__service {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  &__name {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
  }

  &__time {
    color: #78897a;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
  }

  &__menu {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    color: #141414;
    border-bottom: 2px solid #141414;
    border-left: 2px solid #141414;
    transform: rotate(-45deg);
    cursor: pointer;
  }

  &._green {
    .css-grid-item {
      &__inner {
        background: #e3f8ef;
        border-left: 3px solid #4faf81;
      }
    }
  }

  &._red {
    .css-grid-item {
      &__inner {
        background: #ffe1e1;
        border-left: 3px solid #cf5c5c;
      }
    }
  }

  &._blue {
    .css-grid-item {
      &__inner {
        background: #e8f0fd;
        border-left: 3px solid #3160a4;
      }
    }
  }

  &._pink {
    .css-grid-item {
      &__inner {
        background: #f0edfe;
        border-left: 3px solid #6c61be;
      }
    }
  }

  &._yellow {
    .css-grid-item {
      &__inner {
        background: #fff5e9;
        border-left: 3px solid #d8aa67;
      }
    }
  }

  &._dragged {
    visibility: hidden;
  }

  &.drag-feedback {
    //
  }
}
</style>
