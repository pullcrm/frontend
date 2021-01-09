<template>
  <Wrapper
    class="appointment"
    :appointment="appointment"
    @open="openOnPopup"
  >
    <UiText
      class="appointment__client"
      size="m"
    >
      {{ appointment.fullName }}
    </UiText>

    <UiText
      class="appointment__sub-title"
      size="s"
    >
      {{ subTitle }}
    </UiText>

    <div class="appointment__info">
      <UiText
        v-if="appointment.startTime"
        size="s"
        left-icon="timer"
      >
        {{ fromTime }} - {{ toTime }}
      </UiText>

      <UiText
        size="s"
        left-icon="wallet"
      >
        {{ appointment.total | price }}
      </UiText>
    </div>
  </Wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'

import { getAppointmentSubtitle, getProceduresDuration } from '@/logics/appointment'

import Wrapper from './Wrapper.vue'

@Component({
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

  openOnPopup () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-edit',
      props: { appointment: this.appointment }
    })
  }
}
</script>

<style lang="scss" src="./Appointment.scss"></style>
