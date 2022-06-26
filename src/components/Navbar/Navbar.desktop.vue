<script lang="ts" setup>
import NavbarItem from './components/NavbarItem.vue'
import { ADMIN } from '~/constants/roles'

const router = useRouter()

const authStore = useAuthStore()
const baseStore = useBaseStore()
const positionStore = usePositionStore()

const isAnalyticsVisible = computed(() => {
  return positionStore.role.name === ADMIN
})

const profile = computed(() => {
  return baseStore.profile
})

const avatar = computed(() => {
  return profile.value.avatar?.path
})

async function logout() {
  await authStore.logout()

  const { href } = router.resolve({
    name: 'login',
  })

  window.location.href = href
}
</script>

<template>
  <div class="navbar-desktop">
    <img
      class="navbar-desktop__logo"
      src="/static/img/logo.svg"
    >

    <NavbarItem
      tag="RouterLink"
      :to="{ name: 'dashboard' }"
      icon="solid/house-fill"
      name="Головна"
    />

    <NavbarItem
      tag="RouterLink"
      :to="{ name: 'schedule' }"
      icon="solid/calendar-fill"
      name="Календар"
    />

    <NavbarItem
      tag="RouterLink"
      :to="{ name: 'specialists' }"
      icon="solid/users-fill"
      name="Співробітники"
    />

    <NavbarItem
      tag="RouterLink"
      :to="{ name: 'procedures' }"
      icon="solid/list"
      name="Послуги"
    />

    <NavbarItem
      v-if="isAnalyticsVisible"
      tag="RouterLink"
      :to="{ name: 'analytics' }"
      icon="solid/chart-bar-fill"
      name="Аналітика"
    />

    <NavbarItem
      tag="RouterLink"
      :to="{ name: 'settings' }"
      icon="solid/gear-fill"
      name="Налаштування"
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
          @click.prevent="logout"
        >
          Вийти
        </UiText>
      </UiDropdownList>
    </UiDropdownMenu>
  </div>
</template>

<style lang="scss">
  .navbar-desktop {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: $ui-navbar-desktop-width;
    height: 100%;
    padding: 24px 0;
    background: $ui-white;
    box-shadow: 1px 0 0 $ui-black-20;

    &__logo {
      width: 40px;
      height: 40px;
      margin-bottom: 16px;
      border-radius: 2px;
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
