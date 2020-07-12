<template>
  <UiContainer
    class="base-layout-header"
  >
    <div class="base-layout-header__inner">
      <div class="base-layout-header__left">
        <div class="base-layout-header__company">
          <UiPopover
            size="s"
            placement="bottom-left"
          >
            <template #default="{ open, close, isOpened }">
              <UiTitle
                size="s"
                :class="{ '_active': isOpened }"
                @click.native.prevent="isOpened ? close() : open()"
              >
                <UiAvatar
                  :image="logo"
                  :name="company.name"
                  size="m"
                />

                {{ company.name }}

                <UiPrice
                  v-if="balance !== null"
                  size="m"
                >
                  ( {{ balance | price }} )
                </UiPrice>

                <UiIcon
                  name="arrow/chevron/down"
                  size="m"
                />
              </UiTitle>
            </template>

            <template #body>
              <Company
                v-for="approach in approaches"
                :key="approach.id"
                :company="approach.company"
                @click.native="onApproach(approach)"
              />

              <UiButton
                :to="{
                  name: 'companyCreate'
                }"
                theme="blue"
                size="l"
              >
                Добавить компанию
              </UiButton>
            </template>
          </UiPopover>
        </div>
      </div>

      <Profile />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Company from './Company.vue'
import Profile from './Profile.vue'

@Component({
  components: {
    Company,
    Profile
  }
})
export default class AppHeader extends Vue {
  get company () {
    return this.$store.getters['company/current']
  }

  get logo () {
    return this.company?.logo?.path
  }

  get approaches () {
    return this.$store.state.approaches.approaches
  }

  get balance () {
    return this.$store.state.sms.balance
  }

  async onApproach (approach) {
    this.$store.commit('approaches/SET_CURRENT', approach)

    await this.$store.dispatch('auth/fetchRefreshToken')

    location.reload()
  }
}
</script>

<style lang="scss">
  .base-layout-header {
    &__inner {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;
    }

    &__left {
      display: flex;
      align-items: center;
    }

    &__company {
      .ui-avatar {
        margin-right: 16px;
      }

      .ui-title {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .ui-button {
        width: 100%;
      }

      .ui-price {
        margin-left: 8px;
      }
    }
  }
</style>
