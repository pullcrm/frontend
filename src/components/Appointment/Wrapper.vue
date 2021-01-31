<template>
  <div
    class="appointment-wrapper"
    :class="[
      `_size_${sizeName}`,
      `_status_${status}`,
      {'_is-active': isActive}
    ]"
    :style="gridArea"
    :draggable="totalTime > 30"
    @dragend.prevent="dragEnd"
    @dragstart="dragStart"
  >
    <div
      v-click-outside="{
        handler: () => isActive = false,
        isActive: isActive
      }"
      class="appointment-wrapper__inner"
      @dblclick="$emit('open')"
      @click="isActive = true"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SOURCE_WIDGET } from '@/constants'

import { getProceduresDuration } from '@/logics/appointment'

import { slugFromTime } from '@/utils/time'

@Component({
  props: {
    appointment: {
      type: Object,
      required: true
    }
  }
})
export default class Appointment extends Vue {
  readonly appointment

  isActive = false

  get status () {
    // @TODO: Refactor
    const { status, source } = this.appointment

    if (source === SOURCE_WIDGET && status === 'IN_PROGRESS') {
      return 'IN_PROGRESS_WIDGET'
    }

    return status
  }

  get totalTime () {
    return getProceduresDuration(this.appointment)
  }

  get timePoints () {
    return this.$time.getTimePoints({
      timeStart: this.appointment.startTime,
      totalTime: this.totalTime
    })
  }

  get fromTime () {
    return this.timePoints[0]
  }

  get toTime () {
    return this.timePoints[this.timePoints.length - 1]
  }

  get sizeName () {
    if (this.totalTime <= 30) return 'xs'
    if (this.totalTime <= 45) return 'm'

    return 'xl'
  }

  get gridArea () {
    if (this.appointment.isQueue) {
      return
    }

    return {
      gridRow: `${slugFromTime(this.fromTime)}-start / ${slugFromTime(this.toTime)}-end`,
      gridColumn: 'start / end'
    }
  }

  dragStart (event) {
    const height = this.$el.clientHeight
    const width = this.$el.clientWidth

    // TODO: Refactor
    const isDraggableY = event.layerY > height - 8 - 6 - 24 && event.layerY < height - 8 - 4
    const isDraggableX = event.layerX > width - 10 - 6 - 24 && event.layerX < width - 8 - 6

    if (!isDraggableY || !isDraggableX) {
      event.preventDefault()

      return
    }

    event.dataTransfer.effectsAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'

    setTimeout(() => event.target.classList.add('_dragged'), 0)

    this.$store.commit('drugAndDrop/SET_APPOINTMENT_ID', this.appointment.id)
    this.$store.dispatch('drugAndDrop/fetchTimes')
  }

  async dragEnd (event) {
    this.$store.commit('drugAndDrop/RESET_DRAG')

    event.target.classList.remove('_dragged')
  }
}
</script>

<style lang="scss">
.appointment-wrapper {
  z-index: 10;
  display: flex;
  padding: 4px 6px;

  &._dragged {
    pointer-events: none;
  }

  &._status {
    &_IN_PROGRESS {
      .appointment-wrapper__inner {
        &::before {
          background: $ui-yellow-dark;
        }
      }
    }

    &_COMPLETED {
      .appointment-wrapper__inner {
        &::before {
          background: $ui-brand-green;
        }
      }
    }

    &_CANCELED {
      .appointment-wrapper__inner {
        &::before {
          background: $ui-red-danger;
        }
      }
    }

    &_IN_PROGRESS_WIDGET {
      .appointment-wrapper__inner {
        &::before {
          background: #705bcf;
        }
      }
    }
  }

  &._size_xs {
    .appointment-wrapper__inner {
      &::before {
        width: 100%;
      }

      & > * {
        display: none;
      }
    }
  }

  &._size_m {
    .appointment__sub-title {
      .ui-text__content {
        display: none;
      }
    }
  }

  &._is-active {
    .appointment-wrapper__inner {
      box-shadow: 0 0 0 3px #6793ff;
    }
  }

  &__inner {
    @include ui-shadow-4;

    position: relative;
    display: flex;
    flex-direction: column;
    width: $SCHEDULE_ROW_WIDTH;
    padding: 8px 8px 8px 12px;
    background: $ui-white;
    border-radius: 4px;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      border-radius: inherit;
      content: '';
    }
  }
}
</style>
