<template>
  <div class="base-layout-header-company-selector">
    <UiPopover
      size="s"
      placement="bottom-left"
    >
      <template #default="{ open, close, isOpened }">
        <UiTitle
          class="base-layout-header-company-selector__title"
          size="s"
          responsive
          @click.native.prevent="isOpened ? close() : open()"
        >
          <template #prepend>
            <UiAvatar
              :image="logo"
              :name="company.name"
              size="s"
            />
          </template>

          {{ company.name }}

          <UiPrice
            v-if="balance !== null"
            size="xs"
            responsive
          >
            ( {{ balance | price }} )
          </UiPrice>

          <template #append>
            <UiIcon
              name="arrow/chevron/down"
              size="s"
            />
          </template>
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
          size="l"
          theme="blue"
        >
          Добавить компанию
        </UiButton>
      </template>
    </UiPopover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Company from './Company.vue'

@Component({
  components: {
    Company
  }
})
export default class CompanySelector extends Vue {
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

<style lang="scss" src="./CompanySelector.scss"></style>
