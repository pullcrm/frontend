<template>
  <div class="base-layout-header-profile">
    <div class="base-layout-header-profile__info">
      Привет,
      <div class="base-layout-header-profile__name">
        {{ profile.firstName }}
      </div>
    </div>

    <UiAvatar
      class="base-layout-header-profile__avatar"
      :image="avatar"
      :name="profile.firstName"
      size="s"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Profile extends Vue {
  get profile () {
    return this.$store.state.profile.profile
  }

  get avatar () {
    return this.profile.avatar?.path
  }
}
</script>

<style lang="scss">
  .base-layout-header-profile {
    display: flex;
    align-items: center;
    cursor: pointer;

    &__avatar {
      margin-left: 8px;
    }

    &__info {
      @include ui-typo-12;

      color: $ui-black-80;
      text-align: right;
    }

    &__name {
      @include ui-typo-14;

      color: $ui-black-100;
      font-weight: bold;
    }
  }
</style>
