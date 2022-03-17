<template>
  <div class="navbar-mobile">
    <NavbarItem
      :to="{ name: 'dashboard' }"
      icon="solid/house-fill"
      name="Головна"
    />

    <NavbarItem
      :to="{ name: 'schedule' }"
      icon="solid/calendar-fill"
      name="Календар"
    />

    <NavbarItem
      tag="a"
      href="#"
      icon="solid/plus-circle-fill"
      name="Записати"
      @click.native.prevent="addAppointment"
    />

    <NavbarItem
      v-if="isAnalyticsVisible"
      :to="{ name: 'analytics' }"
      icon="solid/chart-bar-fill"
      name="Аналітика"
    />

    <NavbarItem
      v-else
      :to="{ name: 'specialists' }"
      icon="solid/users-fill"
      name="Співробітники"
    />

    <UiPopover
      size="l"
      placement="top"
    >
      <template #default="{ isOpened }">
        <NavbarItem
          tag="a"
          href="#"
          :class="{'_active': isOpened}"
          icon="solid/folder-notch-open-fill"
          name="Меню"
        />
      </template>

      <template #body="{ close }">
        <div
          class="navbar-mobile__popover-menu"
          @click="close"
        >
          <UiText
            tag="RouterLink"
            :to="{ name: 'specialists' }"
            size="m"
            left-icon="solid/users-fill"
          >
            Співробітники
          </UiText>

          <UiText
            tag="RouterLink"
            :to="{ name: 'procedures' }"
            size="m"
            left-icon="solid/list"
          >
            Послуги
          </UiText>

          <UiText
            tag="RouterLink"
            :to="{ name: 'settings' }"
            size="m"
            left-icon="solid/gear-fill"
          >
            Налаштування
          </UiText>

          <UiText
            tag="a"
            href="#"
            size="m"
            left-icon="outlined/sign-out"
            @click.native.prevent.stop="logout"
          >
            Вийти
          </UiText>
        </div>
      </template>
    </UiPopover>
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
export default class NavbarMobile extends Vue {
  get role () {
    return this.$typedStore.getters['position/role']
  }

  get isAnalyticsVisible () {
    return this.role.name === ADMIN
  }

  async addAppointment () {
    await this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: { type: 'new' }
    })
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
  .navbar-mobile {
    @include ui-shadow-4;

    display: flex;
    align-items: center;
    justify-content: space-around;
    height: $ui-navbar-desktop-width;
    height: calc(#{$ui-navbar-desktop-width} + var(--safe-area-inset-bottom));
    padding: 0 8px;
    padding-bottom: var(--safe-area-inset-bottom);
    background: #fff;

    &__popover-menu {
      .ui-text {
        margin-bottom: 16px;

        .ui-icon {
          color: $ui-black-60;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
