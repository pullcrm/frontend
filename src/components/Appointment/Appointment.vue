<template>
  <Wrapper
    class="appointment"
    :appointment="appointment"
    @open="edit"
  >
    <div class="appointment__header">
      <UiText
        size="m"
      >
        {{ appointment.fullName }}
      </UiText>

      <div
        ref="icon"
        class="appointment__menu"
        @click="openMenu"
      >
        <UiIcon
          size="xs"
          name="outlined/dots-three-vertical"
        />
      </div>
    </div>

    <UiText
      class="appointment__sub-title"
      size="s"
    >
      {{ subTitle }}
    </UiText>

    <div class="appointment__footer">
      <div class="appointment__info">
        <UiText
          v-if="appointment.startTime"
          size="s"
          left-icon="outlined/clock"
        >
          {{ fromTime }} - {{ toTime }}
        </UiText>

        <UiText
          size="s"
          left-icon="outlined/wallet"
        >
          {{ appointment.total | price }}
        </UiText>
      </div>

      <div
        class="appointment__draggable"
      >
        <UiIcon
          size="xs"
          name="outlined/hand-grabbing"
        />
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'
import { COMPLETED } from '@/constants/appointment'

import { getAppointmentSubtitle, getProceduresDuration } from '@/logics/appointment'

import PopperMenu from '@/components/PopperMenu/PopperMenu.vue'

import Wrapper from './Wrapper.vue'

@Component({
  inject: ['getPopperMenu'],

  props: {
    appointment: {
      type: Object,
      required: true
    }
  },

  components: {
    Wrapper
  }
})
export default class Appointment extends Vue {
  readonly appointment

  readonly getPopperMenu!: () => PopperMenu

  $refs: {
    icon: HTMLElement
  }

  get isCompleted () {
    return this.appointment.status === COMPLETED
  }

  get subTitle () {
    return getAppointmentSubtitle(this.appointment)
  }

  get totalTime () {
    return getProceduresDuration(this.appointment)
  }

  get fromTime () {
    return this.appointment.startTime
  }

  get toTime () {
    const steps = this.totalTime / TIME_STEP

    return this.$time.shiftTimeUpBySteps(this.fromTime, steps)
  }

  openMenu () {
    const popperMenu = this.getPopperMenu()

    if (popperMenu.reference === this.$refs.icon) {
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

    popperMenu.open(this.$refs.icon, {
      options: [
        edit,
        onCompleted
      ].filter(Boolean),
      placement: 'bottom_end'
    })
  }

  async onCompleted () {
    // @ts-ignore
    await this.$api.appointments.update(this.appointment.id, {
      status: COMPLETED
    })

    await this.$store.dispatch('toasts/show', {
      title: 'Выполнено'
    })

    await this.$store.dispatch('schedule/fetch')
  }

  edit () {
    this.$store.dispatch('popup/show', {
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
