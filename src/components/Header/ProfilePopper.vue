<template>
  <Popper
    v-if="isOpened"
    ref="popper"
    :reference="reference"
    placement="bottom-end"
    @close="close"
  >
    <UiDropdownGroup>
      <UiDropdownList>
        <UiDropdownItem
          class="base-layout-header-profile-popper__logout"
          size="m"
          left-icon="log/out"
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

  logout () {
    this.$store.dispatch('auth/logout')
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
