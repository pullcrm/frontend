<template>
  <UiContainer
    class="base-layout-header"
  >
    <div class="base-layout-header__inner">
      <CompanySelector
        class="base-layout-header__company-selector"
      />

      <Profile
        class="base-layout-header__profile"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Profile from '../Profile.vue'
import CompanySelector from '../CompanySelector/CompanySelector.vue'

@Component({
  components: {
    Profile,
    CompanySelector
  }
})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" src="./Header.scss"></style>
