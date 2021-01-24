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
      icon="solid/clock-fill"
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

    <UiDropdownMenu
      placement="right"
    >
      <template #inner="{ toggle }">
        <UiAvatar
          class="navbar__avatar"
          :image="avatar"
          :name="profile.firstName"
          size="m"
          @click.native="toggle"
        />
      </template>

      <UiDropdownList>
        <UiDropdownItem
          class="navbar__logout"
          size="m"
          left-icon="outlined/sign-out"
          @click.native="logout"
        >
          Выйти
        </UiDropdownItem>
      </UiDropdownList>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import NavbarItem from './NavbarItem.vue'

@Component({
  components: {
    NavbarItem
  }
})
export default class Navbar extends Vue {
  get profile () {
    return this.$store.state.company.profile
  }

  get avatar () {
    return this.profile.avatar?.path
  }

  async logout () {
    await this.$store.dispatch('auth/logout')

    const { href } = this.$router.resolve({
      name: 'login'
    })

    window.location.href = href
  }
}
</script>

<style lang="scss" src="./Navbar.scss"></style>
