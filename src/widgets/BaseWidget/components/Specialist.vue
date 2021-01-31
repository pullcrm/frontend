<template>
  <div class="base-widget-specialist">
    <UiAvatar
      class="base-widget-specialist__image"
      :image="avatar"
      :name="user.firstName"
      size="custom"
    />

    <div class="base-widget-specialist__inner">
      <UiTitle
        size="m"
      >
        {{ user.firstName }} {{ user.lastName }}
      </UiTitle>

      <UiText>
        {{ specialist.description }}
      </UiText>

      <UiButton
        theme="yellow"
        size="l"
        @click.native="$emit('select')"
      >
        Записатись
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class Specialist extends Vue {
  readonly specialist

  get user () {
    return this.specialist.user
  }

  get avatar () {
    return this.specialist.user.avatar?.path
  }
}
</script>

<style lang="scss">
  .base-widget-specialist {
    display: flex;
    align-items: center;
    color: $ui-white;

    &__image {
      @include ui-typo-44;

      flex-basis: 200px;
      width: 200px;
      height: 200px;

      .ui-avatar {
        &__image,
        &__letter {
          border-radius: 50%;
        }
      }
    }

    &__inner {
      flex: 1;
      padding-left: 24px;

      .ui-text {
        margin: 16px 0;
      }
    }

    &:not(:last-child) {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid $ui-black-90;
    }

    @media (max-width: $ui-mobile-portrait - 1px) {
      flex-direction: column;
      text-align: center;

      &__inner {
        width: 100%;
        margin-top: 16px;
        padding-left: 0;

        .ui-button {
          width: 100%;
        }
      }
    }
  }
</style>
