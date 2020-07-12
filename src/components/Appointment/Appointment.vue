<template>
  <Wrapper
    :appointment="appointment"
  >
    <div
      v-click-outside="{
        handler: onOutsideClick,
        isActive: isActive
      }"
      class="appointment"
      :class="[
        `appointment_status_${appointment.status}`,
        `_size_${sizeName}`,
        {'_is-active': isActive}
      ]"
      @dblclick="$emit('open', appointment)"
      @click="isActive = true"
    >
      <div class="appointment__header">
        <UiText
          size="m"
        >
          {{ appointment.fullName }}
        </UiText>

        <div
          class="appointment__menu"
          @click="$emit('open', appointment)"
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
            {{ duration }}
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
    </div>
  </Wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getDurationFromTo } from '@/utils/time'

import Wrapper from './Wrap.vue'

@Component({
  components: {
    Wrapper
  },

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
    return '_new'
  }

  get sizeName () {
    if (this.totalTime <= 30) {
      return 'xs'
    }

    if (this.totalTime <= 45) {
      return 'm'
    }

    return 'xl'
  }

  get subTitle () {
    const {
      procedures,
      description
    } = this.appointment

    let text = procedures
      .map(({ name }) => name)
      .join(', ')

    if (description) {
      text += `\nКомментарий: ${description}`
    }

    return text
  }

  get totalTime () {
    return this.appointment.procedures
      .reduce((sum, { duration }) => (sum + duration), 0)
  }

  get duration () {
    const { from, to } = getDurationFromTo({
      timeStart: this.appointment.startTime,
      totalTime: this.totalTime
    })

    return `${from} - ${to}`
  }

  onOutsideClick () {
    this.isActive = false
  }
}
</script>

<style lang="scss" src="./Appointment.scss"></style>
