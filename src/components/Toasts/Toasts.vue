<script lang="ts" setup>
import Toast from './Toast.vue'

const toastsStore = useToastsStore()

const toasts = computed(() => {
  return toastsStore.toasts
})
</script>

<template>
  <div
    class="toasts"
    data-test="toasts"
  >
    <span>
      <TransitionGroup name="toast">
        <Toast
          v-for="toast in toasts"
          :id="toast.id"
          :key="toast.id"
          v-slot="{ close }"
        >
          <UiToast
            v-bind="toast.props"
            @close="close"
          />
        </Toast>
      </TransitionGroup>
    </span>
  </div>
</template>

<style lang="scss">
  @keyframes toast {
    from {
      transform: translateY(150%);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .toasts {
    position: fixed;
    right: 0;
    bottom: 40px;
    left: 0;
    z-index: 100;
    pointer-events: none;

    > span {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .toast {
      margin-top: 12px;
      pointer-events: all;

      &.toast-enter {
        transform: translateX(150%);
        opacity: 0;
      }

      &.toast-enter-to {
        animation: toast 0.3s ease;
        animation-fill-mode: forwards;
      }

      &.toast-leave-to {
        animation: toast 0.3s ease reverse;
      }
    }

    // @include ui-mobile-only {
    //   right: 16px;
    // }
  }
</style>
