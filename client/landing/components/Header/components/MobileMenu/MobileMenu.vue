<template>
  <div class="landing-header-mobile-menu">
    <div
      class="landing-header-mobile-menu__backdrop"
      @click="close"
    />

    <div class="landing-header-mobile-menu__inner">
      <UiIcon
        size="m"
        name="solid/x-fill"
        class="landing-header-mobile-menu__close"
        @click.native="close"
      />

      <Navigation
        class="landing-header-mobile-menu__navigation"
      />

      <Actions
        class="landing-header-mobile-menu__actions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Actions from '../Actions/Actions.vue'
import Navigation from '../Navigation/Navigation.vue'

@Component({
  components: {
    Actions,
    Navigation
  }
})
export default class MobileMenu extends Vue {
  close () {
    this.$emit('close')
  }
}
</script>

<style lang="scss" src="./MobileMenu.scss"></style>
