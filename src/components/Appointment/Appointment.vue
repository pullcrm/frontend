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
          name="more/vertical"
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

      <div
        class="appointment__draggable"
      >
        <UiIcon
          size="xs"
          name="move"
        />
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getAppointmentSubtitle, getAppointmentDuration } from '@/logics/appointment'

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
    return getAppointmentDuration(this.appointment)
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

  openOnPopup () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-edit',
      props: { appointment: this.appointment }
    })
  }
}
</script>

<style lang="scss" src="./Appointment.scss"></style>
