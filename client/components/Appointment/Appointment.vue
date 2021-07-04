<template>
  <div
    v-click-outside="{
      handler: () => isActive = false,
      isActive: isActive
    }"
    :class="[
      'appointment',
      `appointment_size_${sizeName}`,
      `appointment_status_${status}`,
      {'appointment_is-active': isActive},
      {'appointment_responsive': responsive}
    ]"
    :style="gridArea"
    @dblclick="edit"
    @click="isActive = true"
  >
    <div class="appointment__divider" />

    <div class="appointment__inner">
      <div class="appointment__header">
        <UiBadge
          ref="status"
          size="m"
          theme="custom"
          clickable
          @click.native="openMenu"
        >
          Выполнено
        </UiBadge>

        <UiText
          size="s"
          class="appointment__type"
        >
          Офлайн
        </UiText>
      </div>

      <div class="appointment__title">
        {{ appointment.fullName }}
      </div>

      <UiText
        class="appointment__sub-title"
        size="s"
      >
        {{ subTitle }}
      </UiText>

      <div class="appointment__space" />

      <div class="appointment__footer">
        <UiText
          v-if="appointment.startTime"
          size="s"
          left-icon="outlined/clock"
          class="appointment__duration"
        >
          {{ fromTime }} - {{ toTime }}
        </UiText>

        <div class="appointment__price">
          {{ appointment.total | price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP, SOURCE_WIDGET } from '~/constants'

import { COMPLETED, IN_PROGRESS } from '~/constants/appointment'

import { shiftTimeUpBySteps, getTimePoints, slugFromTime } from '~/utils/time'

import { getAppointmentSubtitle, getProceduresDuration } from '~/logics/appointment'

import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'

@Component({
  inject: ['getPopperMenu'],

  props: {
    appointment: {
      type: Object,
      required: true
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Appointment extends Vue {
  readonly appointment

  isActive = false

  readonly getPopperMenu!: () => PopperMenu

  $refs: {
    status: HTMLElement
  }

  get status () {
    // @TODO: Refactor
    const { status, source } = this.appointment

    if (source === SOURCE_WIDGET && status === IN_PROGRESS) {
      return 'IN_PROGRESS_WIDGET'
    }

    return status
  }

  get timePoints () {
    return getTimePoints(this.workingHours, {
      timeStart: this.appointment.startTime,
      totalTime: this.totalTime
    })
  }

  get sizeName () {
    if (this.totalTime < 30) return 'xs'
    if (this.totalTime < 45) return 's'
    if (this.totalTime < 60) return 'm'
    if (this.totalTime < 75) return 'l'

    return 'xl'
  }

  get gridArea () {
    if (this.appointment.isQueue) {
      return
    }

    return {
      gridRow: `${slugFromTime(this.fromTime)}-start / ${slugFromTime(this.toTime)}-start`,
      gridColumn: 'start / end'
    }
  }

  get isCompleted () {
    return this.appointment.status === COMPLETED
  }

  get subTitle () {
    return getAppointmentSubtitle(this.appointment)
  }

  get workingHours () {
    return this.$typedStore.getters['timetable/workingHours']
  }

  get totalTime () {
    return getProceduresDuration(this.appointment)
  }

  get fromTime () {
    return this.appointment.startTime
  }

  get toTime () {
    const steps = this.totalTime / TIME_STEP

    return shiftTimeUpBySteps(this.workingHours, this.fromTime, steps)
  }

  openMenu () {
    const popperMenu = this.getPopperMenu()

    if (popperMenu.reference === this.$refs.status) {
      return
    }

    const edit = {
      name: 'Редактировать',
      icon: 'outlined/pencil',
      click: this.edit
    }

    const onCompleted = !this.isCompleted && {
      name: 'Выполнено',
      icon: 'outlined/check',
      click: this.onCompleted
    }

    popperMenu.open(this.$refs.status, {
      options: [
        edit,
        onCompleted
      ].filter(Boolean),
      placement: 'bottom_start'
    })
  }

  async onCompleted () {
    await this.$api.appointments.update(this.appointment.id, {
      status: COMPLETED
    })

    await this.$typedStore.dispatch('toasts/show', {
      title: 'Выполнено'
    })

    await this.$typedStore.dispatch('schedule/fetch')
  }

  edit () {
    this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: {
        type: 'edit',
        appointment: this.appointment
      }
    })
  }
}
</script>

<style lang="scss" src="./Appointment.scss"></style>
