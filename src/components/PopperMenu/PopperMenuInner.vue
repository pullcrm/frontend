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
          v-for="(list, index) in options"
          :key="`list-${index}`"
          :name="list.name"
        >
          <UiDropdownItem
            v-for="item in list.items"
            :key="`items-${item.name}`"
            size="m"
            :left-icon="item.icon"
            @click.native="item.click"
          >
            {{ item.name }}
          </UiDropdownItem>
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
    }
  }
})
export default class PopperMenuItem extends Vue {
  readonly styles!: Record<string, string>
  readonly options!: any[]
  readonly placement!: string

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
    z-index: 99;
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