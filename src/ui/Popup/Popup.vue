<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

defineProps({
  fullPage: {
    type: Boolean,
    default: false,
  },

  closable: {
    type: Boolean,
    default: true,
  },

  back: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'back'])

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

const onClose = () => {
  emit('close')
}
</script>

<template>
  <div
    class="ui-popup"
    :class="{
      'ui-popup_full-page': fullPage,
    }"
    data-test="ui-popup"
    @keydown.esc="onClose"
  >
    <UiBack
      v-if="back"
      class="ui-popup__back"
      data-test="ui-popup-back"
      @click="$emit('back')"
    />

    <a
      v-if="closable"
      href="#"
      class="ui-popup__close"
      data-test="ui-popup-close"
      @touchstart.prevent="onClose"
      @click.prevent="onClose"
    >
      <UiIcon
        name="outlined/x"
        size="s"
      />
    </a>

    <slot />
  </div>
</template>

<style lang="scss">
  .ui-popup {
    @include ui-shadow-16;

    --ui-popup-padding: 24px;

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

    &.ui-popup_full-page {
      width: 100%;
      min-height: 100%;
      margin: 0 !important; // TODO: Make without important
      border-radius: 0;
    }

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

      @include ui-hover {
        &:hover {
          .ui-icon {
            color: $ui-black-80;
          }
        }
      }

      &:active {
        .ui-icon {
          color: $ui-black-80;
        }
      }

      .ui-icon {
        color: $ui-black-60;
        vertical-align: middle;
        transition: color var(--ui-transition-hover);
      }
    }

    @media (max-width: ($ui-desktop - 1px)) {
      width: 456px;
    }

    @media (max-width: ($ui-laptop - 1px)) {
      width: 504px;
    }

    @media (max-width: ($ui-tablet - 1px)) {
      width: 416px;

      @media (max-width: ($ui-mobile-portrait - 1px)) {
        --ui-popup-padding: 12px;

        width: 328px;
        padding: 12px;

        &__close {
          top: 12px;
          right: 12px;
        }
      }
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
