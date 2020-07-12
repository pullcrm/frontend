<template>
  <!-- TODO: Use portals -->
  <div
    class="toasts"
    data-test="toasts"
  >
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiToast from '@/ui/Toast/Toast.vue'

import Toast from './Toast.vue'

@Component({
  components: {
    Toast,
    UiToast
  }
})
export default class Toasts extends Vue {
  get toasts () {
    return this.$store.state.toasts.toasts
  }
}
</script>

<style lang="scss">
  @keyframes toast {
    from {
      transform: translateX(120%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .toasts {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 100;

    > span {
      display: flex;
      flex-direction: column;
    }

    .toast {
      margin-top: 16px;

      &.toast-enter {
        transform: translateX(120%);
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
