<template>
  <Popper
    v-if="isOpened"
    ref="popper"
    :reference="reference"
    placement="right"
    @close="close"
  >
    <UiDropdownGroup>
      <UiDropdownList>
        <UiDropdownItem
          class="base-layout-header-profile-popper__logout"
          size="m"
          left-icon="outlined/sign-out"
          @click.native="logout"
        >
          Выйти
        </UiDropdownItem>
      </UiDropdownList>
    </UiDropdownGroup>
  </Popper>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Popper from '@/components/Popper/Popper.vue'

@Component({
  components: {
    Popper
  }
})
export default class ProfilePopper extends Vue {
  reference: HTMLElement
  isOpened = false

  $refs: {
    popper: Popper
  }

  async logout () {
    await this.$store.dispatch('auth/logout')

    const { href } = this.$router.resolve({
      name: 'login'
    })

    window.location.href = href
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
  .base-layout-header-profile-popper {
    &__logout {
      color: $ui-red-danger;
    }
  }
</style>
