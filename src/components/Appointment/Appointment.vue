<template>
  <Wrapper
    class="appointment"
    :appointment="appointment"
    @open="openOnPopup"
  >
    <div class="appointment__header">
      <UiText
        size="m"
      >
        {{ appointment.fullName }}
      </UiText>

      <div
        class="appointment__menu"
        @click="openOnPopup"
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
