<template>
  <div class="landing-header">
    <Container>
      <div class="landing-header__inner">
        <div class="landing-header__logo">
          <UiText
            size="m"
            strong
            responsive
          >
            <template #prepend>
              <img
                src="~/assets/logos/logo_new.svg"
                alt="Pullcrm-logo"
              >
            </template>
            Pullcrm
          </UiText>
        </div>

        <div class="landing-header__nav">
          <Navigation />
        </div>

        <Actions
          class="landing-header__actions"
        />

        <UiIcon
          size="m"
          name="solid/list-fill"
          class="landing-header__burger"
          @click.native="mobileMenuOpen = true"
        />
      </div>
    </Container>

    <MobileMenu
      v-if="mobileMenuOpen"
      class="landing-header__mobile-menu"
      @close="mobileMenuOpen = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Container from '../Container.vue'

import Actions from './components/Actions/Actions.vue'
import MobileMenu from './components/MobileMenu/MobileMenu.vue'
import Navigation from './components/Navigation/Navigation.vue'

@Component({
  components: {
    Actions,
    Container,
    MobileMenu,
    Navigation
  }
})
export default class Header extends Vue {
  mobileMenuOpen = false
}
</script>

<style lang="scss" src="./Header.scss"></style>
