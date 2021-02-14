<template>
  <PopperMenuInner
    v-if="isOpened"
    :styles="styles"
    :options="options"
    :placement="placement"
    @close="close"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PopperMenuInner from './PopperMenuInner.vue'

interface IPopperMenuOpenParams {
  options: IPopperMenuOpenOption[]
  placement?: string
}

interface IPopperMenuOpenOption {
  name?: string
  items: IPopperMenuOpenOptionItem[]
}

interface IPopperMenuOpenOptionItem {
  name: string
  icon: string
  click?: Function
}

@Component({
  components: {
    PopperMenuInner
  }
})
export default class PopperMenu extends Vue {
  options: any[] = []
  reference: HTMLElement | null = null
  placement = 'bottom'

  get isOpened () {
    return Boolean(this.reference)
  }

  get styles () {
    const { height, left, top, width } = this.reference.getBoundingClientRect()

    return {
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
      height: height + 'px'
    }
  }

  async open (reference: HTMLElement, params: IPopperMenuOpenParams) {
    await new Promise(requestAnimationFrame)

    const { options, placement = 'bottom' } = params

    this.options = options
    this.reference = reference
    this.placement = placement
  }

  close () {
    this.options = []
    this.reference = null
    this.placement = 'bottom'
  }
}
</script>