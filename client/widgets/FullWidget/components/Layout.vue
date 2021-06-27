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
          src="~/assets/logos/logo.svg"
          alt="pullcrm"
        >
      </a>

      <UiText
        size="m"
        responsive
        class="full-widget-layout__disclaimer"
      >
        <strong>Pullcrm</strong> — удобный инстурмент автоматизации записи для вашей компании
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
      default: true
    }
  }
})
export default class Container extends Vue {
  readonly back: boolean

  get from () {
    return this.$typedStore.getters['location/from']
  }

  get hasBack () {
    if (this.back === false) {
      return false
    }

    return Boolean(this.from)
  }

  onBack () {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss">
.full-widget-layout {
  --full-widget-footer-height: calc(112px + var(--safe-area-inset-bottom));

  position: relative;
  padding: 24px 16px;
  padding-bottom: calc(var(--full-widget-footer-height) + 44px);

  &__container {
    max-width: 552px;
    margin: 0 auto;
  }

  &__back {
    margin-block: 16px;
  }

  &__logo {
    display: block;
    margin-bottom: 12px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  &__disclaimer {
    strong {
      font-weight: 700;
    }
  }

  &__footer {
    @include ui-safe-bottom;

    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--full-widget-footer-height);
    padding: 0 16px;
    text-align: center;
    background-color: $ui-white;
    border-top: 1px solid $ui-black-20;
  }

  &__fixed-panel {
    @include ui-shadow-4-inverse;

    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    padding: 12px 0;
    background-color: $ui-white;
  }
}
</style>
