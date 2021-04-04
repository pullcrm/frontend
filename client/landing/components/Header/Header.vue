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
                src="~/assets/logos/logo.svg"
                alt="Pullcrm-logo"
              >
            </template>
            Pullcrm
          </UiText>
        </div>

        <div class="landing-header__nav">
          <Navigation />
        </div>

        <div class="landing-header__actions">
          <UiText
            tag="RouterLink"
            to="/login/"
            size="m"
            strong
            left-icon="outlined/sign-in"
            responsive
          >
            Войти
          </UiText>

          <div class="landing-header__actions-divider" />

          <UiText
            tag="RouterLink"
            to="/registration/"
            size="m"
            strong
            responsive
          >
            Регистрация
          </UiText>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Container from '../Container.vue'
import Navigation from '../Navigation/Navigation.vue'

@Component({
  components: {
    Container,
    Navigation
  }
})
export default class Header extends Vue {}
</script>

<style lang="scss" src="./Header.scss"></style>
