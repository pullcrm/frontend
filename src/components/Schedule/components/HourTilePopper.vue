<template>
  <Popper
    v-if="isOpened"
    ref="popper"
    placement="right"
    :reference="reference"
    @close="close"
  >
    <UiDropdownGroup>
      <UiDropdownList :name="`Начало: ${hour}`">
        <UiDropdownItem
          size="m"
          left-icon="plus-circle-fill"
          @click.native="addAppointment"
        >
          Добавить запись
        </UiDropdownItem>

        <UiDropdownItem
          size="m"
          left-icon="prohibit-fill"
          @click.native="addTimeOff"
        >
          Закрыть запись
        </UiDropdownItem>
      </UiDropdownList>
    </UiDropdownGroup>
  </Popper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Popper from '@/components/Popper/Popper.vue'

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
export default class HourTilePoppover extends Vue {
  readonly specialist

  hour = null
  isOpened = false
  reference: HTMLElement

  $refs: {
    popper: Popper
  }

  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        time: this.hour,
        specialistId: this.specialist.id
      }
    })
  }

  addTimeOff () {
    this.$store.dispatch('popup/show', {
      name: 'time-off-new',
      props: {
        time: this.hour,
        specialistId: this.specialist.id
      }
    })
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
}
</script>
