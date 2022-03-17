<template>
  <div class="full-widget-layout">
    <div class="full-widget-layout__container">
      <UiBack
        v-if="hasBack"
        class="full-widget-layout__back"
        @click.native="onBack"
      />

      <slot />
    </div>

    <div class="full-widget-layout__footer">
      <a
        href="https://pullcrm.com"
        target="_blank"
        class="full-widget-layout__logo"
      >
        <img
          src="~/assets/logos/logo_ua.svg"
          alt="pullcrm"
        >
      </a>

      <UiText
        size="m"
        responsive
        class="full-widget-layout__disclaimer"
      >
        <strong>Pullcrm</strong> — зручний інструмент автоматизації запису для вашої компанії
      </UiText>
    </div>

    <div
      v-if="$slots['fixed-panel']"
      class="full-widget-layout__fixed-panel"
    >
      <div class="full-widget-layout__container">
        <slot name="fixed-panel" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    back: {
      type: Boolean,
      default: false
    }
  }
})
export default class Container extends Vue {
  readonly back!: boolean

  hasBack = (
    this.back &&
    this.$typedStore.getters['location/from']
  )

  postMessage (event, payload = {}) {
    parent.postMessage(`pullcrm:${event}|${JSON.stringify(payload)}`, '*')
  }

  onBack () {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss" src="./Layout.scss"></style>
