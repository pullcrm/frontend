<template>
  <div class="navbar-mobile">
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
      icon="solid/plus-circle-fill"
      name="Записать"
      @click.native="addAppointment"
    />

    <NavbarItem
      :to="{ name: 'analytics' }"
      icon="solid/chart-bar-fill"
      name="Аналитика"
    />

    <UiPopover
      size="l"
      placement="top"
    >
      <template #default="{ isOpened }">
        <NavbarItem
          :class="{'_active': isOpened}"
          icon="solid/folder-notch-open-fill"
          name="Меню"
        />
      </template>

      <template #body>
        <div class="navbar-mobile__popover-menu">
          <UiText
            tag="RouterLink"
            :to="{ name: 'specialists' }"
            size="m"
            left-icon="solid/users-fill"
          >
            Сотрудники
          </UiText>

          <UiText
            tag="RouterLink"
            :to="{ name: 'procedures' }"
            size="m"
            left-icon="solid/list"
          >
            Услуги
          </UiText>

          <UiText
            tag="RouterLink"
            :to="{ name: 'settings' }"
            size="m"
            left-icon="solid/gear-fill"
          >
            Настройки
          </UiText>

          <UiText
            size="m"
            left-icon="outlined/sign-out"
            @click.native.prevent="logout"
          >
            Выйти
          </UiText>
        </div>
      </template>
    </UiPopover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import NavbarItem from './components/NavbarItem.vue'

@Component({
  components: {
    NavbarItem
  }
})
export default class NavbarMobile extends Vue {
  async addAppointment () {
    await this.$store.dispatch('popup/show', {
      name: 'appointment',
      props: { type: 'new' }
    })
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
