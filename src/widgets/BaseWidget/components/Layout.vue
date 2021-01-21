<template>
  <div class="base-widget-layout">
    <div class="base-widget-layout__inner">
      <UiMicroText
        v-if="hasBack"
        class="base-widget-layout__back"
        @click.native="back"
      >
        <template #prepend>
          <UiIcon
            size="s"
            name="outlined/arrow-left"
          />
        </template>

        Назад
      </UiMicroText>

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiMicroText from '@/ui/MicroText.vue'

@Component({
  components: {
    UiMicroText
  },

  props: {
    hasBack: {
      type: Boolean,
      default: false
    }
  }
})
export default class BaswWidgetLayout extends Vue {
  readonly hasBack: boolean

  async onUpdateHeight () {
    await new Promise(requestAnimationFrame)

    const height = (this.$el as HTMLElement).offsetHeight

    this.postMessage('updateHeight', { height })
  }

  postMessage (event, payload = {}) {
    parent.postMessage(`pullcrm:${event}|${JSON.stringify(payload)}`, '*')
  }

  back () {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss">
.base-widget-layout {
  padding: 32px;
  background-color: #0d0e0e;

  &__inner {
    max-width: 688px;
    margin: 0 auto;
  }

  &__back {
    margin-bottom: 8px;
    color: $ui-black-80;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: $ui-mobile-portrait - 1px) {
    padding: 16px;
  }
}
</style>
