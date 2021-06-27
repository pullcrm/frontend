<template>
  <div class="dashboard-page-companies">
    <UiTitle
      class="dashboard-page-companies__title"
      size="s"
      responsive
    >
      Мои компании
    </UiTitle>

    <UiCarousel
      class="dashboard-page-companies__carousel"
    >
      <UiCarouselItem
        v-for="position in positions"
        :key="`company-${position.company.id}`"
      >
        <Company
          :position="position"
          @click.native="onPosition(position)"
        />
      </UiCarouselItem>

      <UiCarouselItem>
        <CompanyButton />
      </UiCarouselItem>
    </UiCarousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Company from './Company.vue'
import CompanyButton from './CompanyButton.vue'

@Component({
  components: {
    Company,
    CompanyButton
  }
})
export default class Companies extends Vue {
  get companyId () {
    return this.$typedStore.getters['position/companyId']
  }

  get positions () {
    return this.$typedStore.state.position.positions
  }

  async onPosition (position) {
    if (position.company.id === this.companyId) {
      return
    }

    await this.$typedStore.dispatch('auth/refreshTokenByPosition', position)

    location.reload()
  }
}
</script>

<style lang="scss" src="./Companies.scss"></style>
