<template>
  <div class="navbar-desktop">
    <img
      class="navbar-desktop__logo"
      src="~/assets/logos/logo_new.svg"
    >

    <NavbarItem
      :to="{ name: 'dashboard' }"
      icon="solid/house-fill"
      name="Главная"
    />

    <NavbarItem
      :to="{ name: 'schedule' }"
      icon="solid/calendar-fill"
      name="Календарь"
    />

    <NavbarItem
      :to="{ name: 'specialists' }"
      icon="solid/users-fill"
      name="Сотрудники"
    />

    <NavbarItem
      :to="{ name: 'procedures' }"
      icon="solid/list"
      name="Услуги"
    />

    <NavbarItem
      v-if="isAnalyticsVisible"
      :to="{ name: 'analytics' }"
      icon="solid/chart-bar-fill"
      name="Аналитика"
    />

    <NavbarItem
      :to="{ name: 'settings' }"
      icon="solid/gear-fill"
      name="Настройки"
    />

    <div class="navbar-desktop__space" />

    <UiDropdownMenu
      placement="right"
    >
      <template #inner>
        <UiAvatar
          class="navbar-desktop__avatar"
          size="s"
          :image="avatar"
          :name="profile.fullName"
        />
      </template>

      <UiDropdownList>
        <UiText
          tag="a"
          href="#"
          class="navbar-desktop__logout"
          size="m"
          left-icon="outlined/sign-out"
          @click.native.prevent="logout"
        >
          Выйти
        </UiText>
      </UiDropdownList>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ADMIN } from '~/constants/roles'

import NavbarItem from './components/NavbarItem.vue'

@Component({
  components: {
    NavbarItem
  }
})
export default class NavbarDesktop extends Vue {
  get role () {
    return this.$typedStore.getters['position/role']
  }

  get isAnalyticsVisible () {
    return this.role.name === ADMIN
  }

  get profile () {
    return this.$typedStore.state.profile
  }

  get avatar () {
    return this.profile.avatar?.path
  }

  async logout () {
    await this.$typedStore.dispatch('auth/logout')

    const { href } = this.$router.resolve({
      name: 'login'
    })

    window.location.href = href
  }
}
</script>

<style lang="scss">
  .navbar-desktop {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: $ui-navbar-desktop-width;
    height: 100%;
    padding: 24px 0;
    background: #fff;
    box-shadow: 1px 0 0 $ui-black-20;

    &__logo {
      width: 40px;
      height: 40px;
      margin-bottom: 16px;
      border-radius: 8px;
    }

    &__avatar {
      cursor: pointer;
    }

    &__logout {
      color: $ui-red-danger;
    }

    &__space {
      flex: 1;
    }

    .navbar-item {
      margin-bottom: 16px;
    }
  }
</style>
