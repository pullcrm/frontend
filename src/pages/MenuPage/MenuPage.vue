<script lang="ts" setup>
import BalancePanel from '~/components/BalancePanel/BalancePanel.vue'
import { SITE_EMAIL } from '~/constants'

useMeta({
  title: 'Меню - pullcrm',
})

const router = useRouter()

const authStore = useAuthStore()

async function logout() {
  await authStore.logout()

  const { href } = router.resolve({
    name: 'login',
  })

  window.location.href = href
}

const links = [
  {
    to: { name: 'specialists' },
    icon: 'solid/users-fill',
    title: 'Співробітники',
  },
  {
    to: { name: 'procedures' },
    icon: 'solid/list',
    title: 'Послуги',
  },
  {
    to: { name: 'settings' },
    icon: 'solid/gear-fill',
    title: 'Налаштування',
  },
]
</script>

<template>
  <div class="menu-page" data-test="menu-page">
    <div class="menu-page__section">
      <UiContainer>
        <BalancePanel
          class="menu-page__balance"
        />
      </UiContainer>
    </div>

    <div class="menu-page__section">
      <UiContainer>
        <UiText
          v-for="link in links"
          :key="link.title"
          tag="RouterLink"
          :to="link.to"
          size="m"
          right-icon="outlined/caret-right"
          class="menu-page__link"
        >
          <template #prepend>
            <UiIcon
              size="s"
              :name="link.icon"
            />
          </template>

          {{ link.title }}
        </UiText>
      </UiContainer>
    </div>

    <div class="menu-page__section">
      <UiContainer>
        <UiText
          tag="a"
          href="https://pullcrm.com/faq/"
          target="_blank"
          size="m"
          right-icon="outlined/caret-right"
          class="menu-page__link"
        >
          <template #prepend>
            <UiIcon
              size="s"
              name="solid/question-fill"
            />
          </template>

          FAQ
        </UiText>

        <!-- TODO: This not working with capacitor -->
        <UiText
          tag="a"
          :href="`mailto:${SITE_EMAIL}`"
          size="m"
          right-icon="outlined/caret-right"
          class="menu-page__mail"
        >
          <template #prepend>
            <UiIcon
              size="s"
              name="solid/megaphone-fill"
            />
          </template>

          Написати нам
        </UiText>
      </UiContainer>
    </div>

    <a
      href="#"
      class="menu-page__logout"
    >
      <UiText
        size="m"
        @click.prevent.stop="logout"
      >
        <template #prepend>
          <UiIcon
            size="s"
            name="outlined/sign-out"
          />
        </template>

        Вийти
      </UiText>
    </a>
  </div>
</template>

<style lang="scss" src="./MenuPage.scss"></style>
