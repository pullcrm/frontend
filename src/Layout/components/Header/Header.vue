<template>
  <UiContainer
    class="base-layout-header"
  >
    <div class="base-layout-header__inner">
      <CompanySelector
        class="base-layout-header__company-selector"
        @click.native.prevent="popperCompanySelectorToggle"
      />

      <Profile
        class="base-layout-header__profile"
        @click.native.prevent="popperProfileToggle"
      />

      <CompanySelectorPopper
        ref="companySelectorPopper"
      />

      <ProfilePopper
        ref="profilePopper"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Profile from '../Profile.vue'
import ProfilePopper from '../ProfilePopper.vue'
import CompanySelector from '../CompanySelector.vue'
import CompanySelectorPopper from '../CompanySelectorPopper.vue'

@Component({
  components: {
    Profile,
    ProfilePopper,
    CompanySelector,
    CompanySelectorPopper
  }
})
export default class DashboardHeader extends Vue {
  $refs: {
    profilePopper: ProfilePopper
    companySelectorPopper: CompanySelectorPopper
  }

  popperCompanySelectorToggle () {
    const reference = this.$el.querySelector('.base-layout-header-company-selector__avatar') as HTMLElement

    this.$refs.companySelectorPopper.toggle(reference)
  }

  popperProfileToggle () {
    const reference = this.$el.querySelector('.base-layout-header-profile__avatar') as HTMLElement

    this.$refs.profilePopper.toggle(reference)
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
