<template>
  <div class="navbar">
    <img
      class="navbar__logo"
      src="@/assets/logos/logo.svg"
    >

    <NavbarItem
      :to="{ name: 'dashboard' }"
      icon="solid/house-fill"
    />

    <NavbarItem
      :to="{ name: 'schedule' }"
      icon="solid/calendar-fill"
    />

    <!-- <NavbarItem
      :to="{ name: 'timeOff' }"
      icon="clock"
    /> -->

    <NavbarItem
      :to="{ name: 'specialists' }"
      icon="solid/users-fill"
    />

    <NavbarItem
      :to="{ name: 'procedures' }"
      icon="solid/list"
    />

    <NavbarItem
      :to="{ name: 'settings' }"
      icon="solid/gear-fill"
    />

    <div class="navbar__space" />

    <UiAvatar
      class="navbar__avatar"
      :image="avatar"
      :name="profile.firstName"
      size="s"
      @click.native="popperProfileToggle"
    />

    <ProfilePopper
      ref="profilePopper"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import NavbarItem from './NavbarItem.vue'
import ProfilePopper from './ProfilePopper.vue'

@Component({
  components: {
    NavbarItem,
    ProfilePopper
  }
})
export default class Navbar extends Vue {
  $refs: {
    profilePopper: ProfilePopper
  }

  get profile () {
    return this.$store.state.company.profile
  }

  get avatar () {
    return this.profile.avatar?.path
  }

  popperProfileToggle () {
    const reference = this.$el.querySelector('.navbar__avatar') as HTMLElement

    this.$refs.profilePopper.toggle(reference)
  }
}
</script>

<style lang="scss" src="./Navbar.scss"></style>
