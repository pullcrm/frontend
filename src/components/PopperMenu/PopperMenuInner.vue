<template>
  <div
    v-click-outside="{
      handler: close
    }"
    class="popover-menu-inner"
    :style="styles"
  >
    <UiPopover
      ref="popover"
      size="m"
      :placement="placement"
      :closed-outside="false"
    >
      <template #body>
        <UiDropdownList
          :name="name"
        >
          <UiText
            v-for="item in options"
            :key="item.name"
            tag="a"
            href="#"
            size="m"
            :left-icon="item.icon"
            @click.native.prevent="
              item.click(),
              onClosable && close()
            "
          >
            {{ item.name }}
          </UiText>
        </UiDropdownList>
      </template>
    </UiPopover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiPopover from '@/ui/Popover/Popover.vue'

@Component({
  props: {
    name: {
      type: String,
      default: null
    },

    styles: {
      type: Object,
      required: true
    },

    options: {
      type: Array,
      required: true
    },

    placement: {
      type: String,
      default: 'bottom'
    },

    onClosable: {
      type: Boolean,
      default: true
    }
  }
})
export default class PopperMenuItem extends Vue {
  readonly styles!: Record<string, string>
  readonly options!: any[]
  readonly placement!: string
  readonly onClosable!: boolean

  $refs: {
    popover: UiPopover
  }

  mounted () {
    this.$refs.popover.open()

    window.addEventListener('scroll', this.close, { passive: true })
    window.addEventListener('resize', this.close, { passive: true })

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.close)
      window.removeEventListener('resize', this.close)
    })
  }

  close () {
    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .popover-menu-inner {
    position: fixed;
    z-index: 101;
    display: flex;
    pointer-events: none;

    .ui-popover {
      width: 100%;
      height: 100%;

      &__body {
        pointer-events: all;
      }
    }
  }
</style>
