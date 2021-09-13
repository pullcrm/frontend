<template>
  <div class="landing-header-actions">
    <UiText
      tag="RouterLink"
      to="/login/"
      size="m"
      strong
      class="landing-header-actions__login"
    >
      Войти
    </UiText>

    <div class="landing-header-actions__divider" />

    <UiText
      tag="RouterLink"
      to="/registration/"
      size="m"
      strong
      class="landing-header-actions__registration"
    >
      Регистрация
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Actions extends Vue {}
</script>

<style lang="scss" src="./Actions.scss"></style>
