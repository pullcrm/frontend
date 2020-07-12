<template>
  <form
    class="auth-form"
    @submit.prevent="$emit('on-submit')"
  >
    <div
      v-if="canBack"
      class="auth-form__back"
      @click="$emit('on-back')"
    >
      назад
    </div>

    <div
      v-if="title"
      class="auth-form__title"
    >
      {{ title }}
    </div>

    <div
      v-if="subTitle"
      class="auth-form__sub-title"
    >
      {{ subTitle }}
    </div>

    <slot />

    <div
      v-if="$slots.actions"
      class="auth-form__actions"
    >
      <slot name="actions" />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: {
      type: String,
      default: undefined
    },

    subTitle: {
      type: String,
      default: undefined
    },

    canBack: {
      type: Boolean,
      default: false
    }
  }
})
export default class Form extends Vue {

}
</script>

<style lang="scss">
  .auth-form {
    width: 380px;
    padding: 24px;
    background: #fff;
    border-radius: 16px;

    &__actions {
      margin-top: 24px;
    }

    &__back {
      display: inline-block;
      margin-bottom: 8px;
      padding-left: 16px;
      color: #717171;
      font-size: 12px;
      line-height: 24px;
      background-image: url('~@/assets/icons/arrow-left.svg');
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 16px;
      cursor: pointer;
    }

    &__title {
      margin-bottom: 24px;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
    }

    &__sub-title {
      margin-top: -16px;
      margin-bottom: 24px;
      color: #898989;
      font-size: 14px;
      line-height: 18px;
    }
  }
</style>
