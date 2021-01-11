<template>
  <Popper
    v-if="isOpened"
    ref="popper"
    :reference="reference"
    placement="bottom-end"
    @close="close"
  >
    <UiDropdownGroup>
      <UiDropdownList>
        <UiDropdownItem
          size="m"
          left-icon="edit/edit-1"
          @click.native="openPopup"
        >
          Редактировать
        </UiDropdownItem>

        <UiDropdownItem
          v-if="isClosedDay === false"
          size="m"
          left-icon="slash"
          @click.native="onCloseDay"
        >
          Закрыть запись на этот день
        </UiDropdownItem>
      </UiDropdownList>
    </UiDropdownGroup>
  </Popper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Popper from '@/components/Popper/Popper.vue'

import { START_TIME_OF_DAY, END_TIME_OF_DAY } from '@/constants'

import { setTime } from '@/utils/date-time'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    }
  },

  components: {
    Popper
  }
})
export default class SpecialistPopper extends Vue {
  readonly specialist

  reference: HTMLElement
  isOpened = false

  $refs: {
    popper: Popper
  }

  get isClosedDay () {
    return this.$store.getters['schedule/isClosedDay'](this.specialist.id)
  }

  toggle (reference: HTMLElement) {
    if (this.isOpened) {
      this.close()
    } else {
      this.open(reference)
    }
  }

  open (reference: HTMLElement) {
    this.reference = reference

    this.isOpened = true
  }

  close () {
    this.isOpened = false
  }

  async onCloseDay () {
    const date = new Date(this.$store.state.schedule.date)

    const endDateTime = setTime(date, END_TIME_OF_DAY).format('MM.DD.YY HH:mm')
    const startDateTime = setTime(date, START_TIME_OF_DAY).format('MM.DD.YY HH:mm')

    await this.$api.timeOff.create({
      specialistId: this.specialist.id,
      endDateTime,
      startDateTime
    })

    await this.$store.dispatch('schedule/fetchTimeOffs')

    this.$refs.popper.popper.update()
  }

  openPopup () {
    this.$store.dispatch('popup/show', {
      name: 'specialist-edit',
      props: { user: this.specialist }
    })
  }
}
</script>

<style lang="scss">
  //
</style>
