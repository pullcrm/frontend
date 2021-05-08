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

import UiPopupBackdrop from '~/ui/PopupBackdrop/PopupBackdrop.vue'

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
    return this.$typedStore.getters['popup/isVisible'](this.name)
  }

  get props () {
    return this.$typedStore.state.popup.activeProps
  }

  mounted () {
    window.addEventListener('keyup', this.keyPress, { passive: true })

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keyup', this.keyPress)
    })
  }

  onClose () {
    this.$typedStore.dispatch('popup/hide', this.name)

    this.$emit('close')
  }

  keyPress ({ key }) {
    if (this.isVisible && (key === 'Escape' || key === 'Esc')) {
      this.onClose()
    }
  }
}
</script>
