<template>
  <Popper
    v-if="isOpened"
    ref="popper"
    class="base-layout-header-company-selector-popper"
    :reference="reference"
    placement="bottom-start"
    @close="close"
  >
    <div
      class="base-layout-header-company-selector-popper__inner"
    >
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
    </div>
  </Popper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Popper from '@/components/Popper/Popper.vue'

import Company from './Company.vue'

@Component({
  components: {
    Popper,
    Company
  }
})
export default class CompanySelectorPoppper extends Vue {
  reference: HTMLElement
  isOpened = false

  $refs: {
    popper: Popper
  }

  get approaches () {
    return this.$store.state.approaches.approaches
  }

  async onApproach (approach) {
    this.$store.commit('approaches/SET_CURRENT', approach)

    await this.$store.dispatch('auth/fetchRefreshToken')

    location.reload()
  }

  toggle (reference: HTMLElement) {
    if (this.isOpened) {
      this.close()
    } else {
      this.open(reference)
    }
  }

  open (reference: HTMLElement) {
    this.reference = reference

    this.isOpened = true
  }

  close () {
    this.isOpened = false
  }
}
</script>

<style lang="scss">
  .base-layout-header-company-selector-popper {
    &__inner {
      padding: 16px;
    }

    .ui-button {
      width: 100%;
    }
  }
</style>
