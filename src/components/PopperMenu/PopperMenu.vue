<template>
  <PopperMenuInner
    v-if="isOpened"
    :styles="styles"
    :name="name"
    :options="options"
    :placement="placement"
    :on-closable="onClosable"
    @close="close"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PopperMenuInner from './PopperMenuInner.vue'

interface IPopperMenuOpenParams {
  name?: string
  options: IPopperMenuOpenOptionItem[]
  placement?: string
  onClosable?: boolean
}

interface IPopperMenuOpenOptionItem {
  name: string
  icon?: string
  click?: Function
}

@Component({
  components: {
    PopperMenuInner
  }
})
export default class PopperMenu extends Vue {
  name: string | null
  options: any[] = []
  reference: HTMLElement | null = null
  placement = 'bottom'
  onClosable = true

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

    const { name, options, placement = 'bottom', onClosable = true } = params

    this.name = name
    this.options = options
    this.reference = reference
    this.placement = placement
    this.onClosable = onClosable
  }

  close () {
    this.name = null
    this.options = []
    this.reference = null
    this.placement = 'bottom'
  }
}
</script>
