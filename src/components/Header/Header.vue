<script lang="ts" setup>
import { formatMoney } from '~/utils/money'
import { SITE_EMAIL } from '~/constants'

const smsStore = useSmsStore()
const positionStore = usePositionStore()

const WIDGET_HOST = process.env.WIDGET_HOST

const router = useRouter()

const company = computed(() => {
  return positionStore.company
})

const logo = computed(() => {
  return company.value.logo?.path
})

const balance = computed(() => {
  return smsStore.balance
})

const companyId = computed(() => {
  return positionStore.companyId
})

const siteUrl = computed(() => {
  const { href } = router.resolve({
    name: 'fullWidgetSpecialistsPage',
    query: {
      companyId: companyId.value,
    },
  })

  return `https://${WIDGET_HOST}${href}`
})
</script>

<template>
  <div class="header" data-test="header">
    <UiContainer>
      <div class="header__inner">
        <div class="header__left">
          <UiText
            tag="a"
            size="l"
            :href="siteUrl"
            target="_blank"
            right-icon="solid/link-fill"
            responsive
            data-test="widget-link"
          >
            Ваш веб-сайт
          </UiText>

          <UiText
            tag="a"
            :href="`mailto:${SITE_EMAIL}`"
            size="l"
            right-icon="outlined/megaphone"
            responsive
            class="header__mail"
          >
            Повідомити про проблему
          </UiText>
        </div>

        <div class="header__right">
          <UiText
            v-if="balance !== null"
            tag="RouterLink"
            :to="{ name: 'smsSettings' }"
            size="l"
            strong
            responsive
            right-icon="outlined/wallet"
            class="header__balance"
          >
            {{ formatMoney(balance) }}
          </UiText>

          <UiAvatar
            class="header__avatar"
            size="s"
            :image="logo"
            :name="company.name"
          />
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<style lang="scss" src="./Header.scss"></style>
