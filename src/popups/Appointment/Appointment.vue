<script lang="ts" setup>
import AppointmentNew from './New.vue'
import AppointmentEdit from './Edit.vue'

// inheritAttrs: true,

defineProps({
  type: {
    type: String,
    default: 'new',
  },
})

defineEmits(['close'])
// readonly type: 'new' | 'edit'
</script>

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
        @click="$emit('close')"
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

<style lang="scss" src="./Appointment.scss"></style>
