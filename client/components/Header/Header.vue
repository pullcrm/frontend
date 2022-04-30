<template>
  <div class="header">
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
          >
            Ваш веб-сайт
          </UiText>

          <UiText
            tag="a"
            href="mailto:admin@pullcrm.com"
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
            {{ balance | price }}
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Header extends Vue {
  get company () {
    return this.$typedStore.getters['position/company']
  }

  get logo () {
    return this.company.logo?.path
  }

  get balance () {
    return this.$typedStore.state.sms.balance
  }

  get companyId () {
    return this.$typedStore.getters['position/companyId']
  }

  get siteUrl () {
    const { BASE_HOST } = this.$runtimeConfig

    const { href } = this.$router.resolve({
      name: 'fullWidgetSpecialistsPage',
      query: {
        companyId: this.companyId
      }
    })

    return `https://${BASE_HOST}${href}`
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
