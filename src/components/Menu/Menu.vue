<template>
  <div class="menu">
    <div
      class="menu__logo"
    >
      <img src="@/assets/logos/logo.png">
    </div>

    <MenuItem
      :to="{ name: 'dashboard' }"
      icon="house-fill"
    />

    <MenuItem
      :to="{ name: 'schedule' }"
      icon="calendar-fill"
    />

    <!-- <MenuItem
      :to="{ name: 'timeOff' }"
      icon="clock-fill"
    /> -->

    <MenuItem
      :to="{ name: 'specialists' }"
      icon="users-fill"
    />

    <MenuItem
      :to="{ name: 'procedures' }"
      icon="list-bullets-fill"
    />

    <MenuItem
      :to="{ name: 'settings' }"
      icon="gear-fill"
    />

    <div class="menu__space" />

    <UiAvatar
      class="menu__avatar"
      :image="avatar"
      :name="profile.firstName"
      size="s"
      @click.native.prevent="popperProfileToggle"
    />

    <ProfilePopper
      ref="profilePopper"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import MenuItem from './MenuItem.vue'
import ProfilePopper from './ProfilePopper.vue'

@Component({
  components: {
    MenuItem,
    ProfilePopper
  }
})
export default class Menu extends Vue {
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
    const reference = this.$el.querySelector('.menu__avatar') as HTMLElement

    this.$refs.profilePopper.toggle(reference)
  }
}
</script>

<style lang="scss" src="./Menu.scss"></style>
