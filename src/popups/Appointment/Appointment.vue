<template>
  <UiPopup
    class="appointment-popup"
    full-page
    :closable="false"
    @close="$emit('close')"
  >
    <UiContainer narrow>
      <UiBack
        class="appointment-popup__back"
        @click.native="$emit('close')"
      />

      <AppointmentNew
        v-if="type === 'new'"
        v-bind="$attrs"
      />

      <AppointmentEdit
        v-if="type === 'edit'"
        v-bind="$attrs"
      />
    </UiContainer>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import AppointmentNew from './New.vue'
import AppointmentEdit from './Edit.vue'

@Component({
  inheritAttrs: true,

  components: {
    AppointmentNew,
    AppointmentEdit
  },

  props: {
    type: {
      type: String,
      default: 'new'
    }
  }
})
export default class Appointment extends Vue {
  readonly type: 'new' | 'edit'
}
</script>

<style lang="scss" src="./Appointment.scss"></style>
