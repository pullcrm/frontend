<template>
  <div class="base-layout-header">
    <UiContainer>
      <div class="base-layout-header__inner">
        <PortalTarget
          class="base-layout-header__left"
          name="header-left"
        />

        <div class="base-layout-header__right">
          <UiText
            tag="UiLink"
            size="m"
            theme="primary"
            left-icon="outlined/question"
            responsive
          >
            Вопросы / ответы
          </UiText>

          <UiText
            tag="UiLink"
            size="m"
            theme="primary"
            left-icon="outlined/link"
            responsive
          >
            Персональная страница
          </UiText>

          <UiText
            v-if="balance !== null"
            size="m"
            left-icon="outlined/chat-text"
            responsive
          >
            <UiPrice
              size="xs"
              responsive
            >
              {{ balance | price }}
            </UiPrice>
          </UiText>

          <UiAvatar
            :image="logo"
            :name="company.name"
            size="m"
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
export default class DashboardHeader extends Vue {
  get company () {
    return this.$store.getters['company/current']
  }

  get logo () {
    return this.company?.logo?.path
  }

  get balance () {
    return this.$store.state.sms.balance
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
