<template>
  <div
    class="ui-popup"
    data-test="ui-popup"
    @keydown.esc="onClose"
  >
    <!-- <UiBack
      v-if="back"
      class="ui-popup__back"
      data-test="ui-popup-back"
      @click.native="$emit('back')"
    /> -->

    <a
      v-if="closable"
      href="#"
      class="ui-popup__close"
      data-test="ui-popup-close"
      @touchstart.prevent="onClose"
      @click.prevent="onClose"
    >
      <UiIcon
        name="close/close-1"
        size="s"
      />
    </a>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    closable: {
      type: Boolean,
      default: true
    },

    back: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    document.body.style.overflow = 'hidden'
  },

  beforeDestroy () {
    document.body.style.overflow = ''
  },

  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  .ui-popup {
    @include ui-shadow-16;

    position: relative;
    z-index: 101;
    display: inline-block;
    width: 424px;
    padding: 24px;
    white-space: normal;
    text-align: left;
    vertical-align: middle;
    background-color: $ui-white;
    border-radius: 8px;
    pointer-events: all;

    &__back {
      margin-bottom: 16px;
    }

    &__close {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 5;

      /* Extend click area */
      &::before {
        position: absolute;
        top: -8px;
        right: -8px;
        bottom: -8px;
        left: -8px;
        content: '';
      }

      &:hover {
        .ui-icon {
          color: $ui-black-100;
        }
      }

      .ui-icon {
        color: $ui-black-80;
        vertical-align: middle;
        transition: color var(--ui-transition-hover);
      }

      + .ui-popup-title {
        padding-right: 40px;
      }
    }

    @media (max-width: $ui-desktop - 1px) {
      width: 456px;
    }

    @include ui-mobile-only {
      width: 100%;
      border-radius: 0;
    }
  }

  @keyframes ui-popup-move {
    from {
      transform: translateY(-25%);
      opacity: 0.2;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
