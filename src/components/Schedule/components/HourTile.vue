<template>
  <UiDropdownMenu
    class="schedule-hour-tile"
    :class="[
      {'_is-minute': isMinute}
    ]"
    :style="gridArea"
    placement="bottom"
    size="m"
  >
    <template #inner="{ toggle }">
      <div
        class="schedule-hour-tile__inner"
        @click="toggle"
        @dblclick="addAppointment"
        @drop.prevent="dropZoneDropHandler"
        @dragover.prevent
        @dragenter.prevent="dropZoneEnterHandler"
        @dragleave.prevent="dropZoneLeaveHandler"
      >
        <UiIcon
          class="schedule-hour-tile__icon"
          size="xs"
          name="outlined/plus"
        />
      </div>
    </template>

    <UiDropdownList :name="`Начало: ${hour}`">
      <UiDropdownItem
        size="m"
        left-icon="outlined/plus-circle"
        @click.native="addAppointment"
      >
        Добавить запись
      </UiDropdownItem>

      <UiDropdownItem
        size="m"
        left-icon="outlined/prohibit"
        @click.native="addTimeOff"
      >
        Закрыть запись
      </UiDropdownItem>
    </UiDropdownList>
  </UiDropdownMenu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'

// TODO: Replace all @/utils/date-time to @/utils/dayjs
import { toDate } from '@/utils/date-time'
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

  get isSMSAuthorize (): Boolean {
    return this.$store.getters['sms/isAuthorize']
  }

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

  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        time: this.hour,
        specialistId: this.specialistId
      }
    })
  }

  addTimeOff () {
    this.$store.dispatch('popup/show', {
      name: 'time-off-new',
      props: {
        time: this.hour,
        specialistId: this.specialistId
      }
    })
  }

  dropZoneEnterHandler () {
    const steps = (this.$store.getters['drugAndDrop/totalDuration'] / TIME_STEP) - 1
    const time = this.$time.shiftTimeDownBySteps(this.hour, steps)

    if (this.$store.getters['drugAndDrop/getSlotByTime'](time, this.specialistId) === false) {
      return
    }

    this.$store.commit('drugAndDrop/SET_TIME', time)
    this.$store.commit('drugAndDrop/SET_SPECIALIST_ID', this.specialistId)

    setTimeout(() => {
      this.$store.commit('drugAndDrop/SET_OVERED', true)
    }, 0)
  }

  dropZoneLeaveHandler (event) {
    if (event.relatedTarget !== null) {
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
      this.$store.commit('drugAndDrop/SET_OVERED', false)
    }
  }

  async dropZoneDropHandler () {
    try {
      this.$store.commit('schedule/SET_LOADING', true)

      const appointmentId = this.$store.state.drugAndDrop.appointmentId
      const appointment = this.$store.getters['appointments/appointmentById'](appointmentId)

      const { time: startTime, specialistId } = this.$store.state.drugAndDrop

      await this.$store.dispatch('appointments/update', {
        ...appointment,
        date: toDate(appointment.date),
        startTime,
        specialistId,
        hasRemindSMS: this.isSMSAuthorize ? Boolean(appointment.smsIdentifier) : null
      })

      await this.$store.dispatch('schedule/fetch')
    } finally {
      this.$store.commit('schedule/SET_LOADING', false)
    }
  }
}
</script>

<style lang="scss">
  .schedule-hour-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $ui-black-40;

    &__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    &__icon {
      color: $ui-black-100;
      opacity: 0;
      transition: $ui-transition;
    }

    @include ui-hover {
      &:hover {
        .schedule-hour-tile {
          &__icon {
            opacity: 1;
          }
        }
      }
    }

    &._is-minute {
      border-color: $ui-black-20;
    }

    &:last-child {
      border: none;
    }

    &.ui-popover_top {
      .ui-popover {
        &__body,
        &__arrow {
          top: 0;
        }
      }
    }

    &.ui-popover_bottom {
      .ui-popover {
        &__body,
        &__arrow {
          bottom: 0;
        }
      }
    }
  }
</style>
