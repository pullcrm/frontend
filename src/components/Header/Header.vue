<template>
  <UiContainer
    class="base-layout-header"
  >
    <div class="base-layout-header__inner">
      <CompanySelector
        class="base-layout-header__company-selector"
        @click.native.prevent="popperCompanySelectorToggle"
      />

      <CompanySelectorPopper
        ref="companySelectorPopper"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CompanySelector from './CompanySelector.vue'
import CompanySelectorPopper from './CompanySelectorPopper.vue'

@Component({
  components: {
    CompanySelector,
    CompanySelectorPopper
  }
})
export default class DashboardHeader extends Vue {
  $refs: {
    companySelectorPopper: CompanySelectorPopper
  }

  popperCompanySelectorToggle () {
    const reference = this.$el.querySelector('.base-layout-header-company-selector__avatar') as HTMLElement

    this.$refs.companySelectorPopper.toggle(reference)
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
