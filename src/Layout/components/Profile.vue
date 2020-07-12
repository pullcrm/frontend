<template>
  <UiDropdownMenu
    size="s"
    placement="bottom-right"
  >
    <template #inner="{ open, close, isOpened }">
      <div
        class="base-layout-header-profile"
        @click="isOpened ? close() : open()"
      >
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
          size="m"
        />
      </div>
    </template>

    <UiDropdownGroup>
      <!-- <UiText
        size="m"
        left-icon="person/person"
      >
        Профиль
      </UiText> -->

      <UiText
        class="base-layout-header-profile__logout"
        size="m"
        left-icon="log/out"
        @click.native="logout"
      >
        Выйти
      </UiText>
    </UiDropdownGroup>
  </UiDropdownMenu>
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

  logout () {
    this.$store.dispatch('auth/logout')
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

    &__menu {
      .ui-text {
        cursor: pointer;

        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }

    &__logout {
      color: $ui-red-danger;
    }
  }
</style>
