<template>
  <div
    class="appointment-wrap"
    :class="[
      { '_dragged': isDragged }
    ]"
    :style="gridArea"
  >
    <!-- draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd" -->

    <slot v-bind="this" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { getDurationSlotsFromTo } from '@/utils/time'

@Component({
  props: {
    appointment: {
      type: Object,
      required: true
    }
  }
})
export default class Wrap extends Vue {
  readonly appointment

  isDragged = false

  get employee () {
    return this.appointment.employee
  }

  get totalTime () {
    return this.appointment.procedures
      .reduce((sum, { duration }) => (sum + duration), 0)
  }

  get duration () {
    if (!this.appointment.startTime) {
      return
    }

    return getDurationSlotsFromTo({
      timeStart: this.appointment.startTime,
      totalTime: this.totalTime
    })
  }

  get gridArea () {
    if (!this.duration) {
      return
    }

    return {
      gridRow: `${this.duration.from} / ${this.duration.to}`,
      gridColumn: 'start / end'
    }
  }

  // dragStart (ev) {
  //   ev.dataTransfer.setData('type/dragged-box', 'dragged')

  //   ev.dataTransfer.effectsAllowed = 'move'
  //   ev.dataTransfer.dropEffect = 'move'

  //   setTimeout(() => (this.isDragged = true), 100)

  //   this.$store.commit('drugAndDrop/SET_DRAG_ELEMENT', {
  //     appointmentId: this.appointment.id,
  //     layerY: ev.layerY,
  //     totalTime: this.totalTime
  //   })
  // }

  // async dragEnd () {
  //   const dragZoneOver = this.$store.state.drugAndDrop.dragZoneOver

  //   if (dragZoneOver) {
  //     await this.onUpdate()
  //   }

  //   this.isDragged = false

  //   this.$store.commit('drugAndDrop/RESET_DRAG')
  // }

  // // TODO: Refactor
  // async onUpdate () {
  //   this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', false)

  //   const form = {
  //     fullName: this.appointment.fullName,
  //     phone: this.appointment.phone,
  //     procedures: this.appointment.procedures.map(({ id }) => id),
  //     total: this.appointment.procedures.reduce((total, { price }) => total + price, 0),
  //     description: this.appointment.description,
  //     isQueue: this.appointment.isQueue,
  //     date: this.appointment.date
  //   }

  //   const { employeeId } = this.$store.state.drugAndDrop.dragZone
  //   const { from } = this.$store.getters['drugAndDrop/dropTimeObject']

  //   this.$store.commit('calendar/SET_LOADING', true)

  //   await this.$api.appointments.update(this.appointment.id, {
  //     ...form,
  //     startTime: `${from}:00`,
  //     employeeId
  //   })

  //   await this.$store.dispatch('calendar/fetch')
  // }
}
</script>

<style lang="scss" src="./Wrap.scss"></style>
