<template>
  <UiPopupBackdrop
    v-if="isVisible"
    class="popup"
    :align="align"
    @close="onClose"
  >
    <slot
      :close="onClose"
      :props="props"
    />
  </UiPopupBackdrop>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiPopupBackdrop from '@/ui/Popup/Backdrop.vue'

@Component({
  inheritAttrs: false,

  components: {
    UiPopupBackdrop
  },

  props: {
    name: {
      type: String,
      required: true
    },

    align: {
      type: String,
      default: 'center'
    }
  }
})
export default class Popup extends Vue {
  readonly name: string
  readonly align:
    | 'left'
    | 'center'
    | 'right'

  get isVisible () {
    return this.$store.getters['popup/isVisible'](this.name)
  }

  get props () {
    return this.$store.state.popup.activeProps
  }

  onClose () {
    this.$store.dispatch('popup/hide', this.name)

    this.$emit('close')
  }
}
</script>
