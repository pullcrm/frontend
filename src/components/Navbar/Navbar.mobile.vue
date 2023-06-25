<script lang="ts" setup>
import NavbarItem from './components/NavbarItem.vue'
import { ADMIN } from '~/constants/roles'

const router = useRouter()

const authStore = useAuthStore()
const popupStore = usePopupStore()
const positionStore = usePositionStore()

const isAnalyticsVisible = computed(() => {
  return positionStore.role.name === ADMIN
})

async function addAppointment() {
  await popupStore.show({
    name: 'appointment',
    props: { type: 'new' },
  })
}

async function logout() {
  await authStore.logout()

  const { href } = router.resolve({
    name: 'login',
  })

  window.location.href = href
}
</script>

<template>
  <div class="navbar-mobile">
    <NavbarItem
      :to="{ name: 'dashboard' }"
      icon="solid/house-fill"
      name="Головна"
      active-class="router-link-active-home"
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
      @click.prevent="addAppointment"
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

    <NavbarItem
      :to="{ name: 'menu' }"
      icon="solid/folder-notch-open-fill"
      name="Меню"
    />
  </div>
</template>

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
}
</style>
