<template>
  <div class="landing-navigation">
    <UiText
      tag="RouterLink"
      to="/"
      size="m"
      strong
      responsive
    >
      Главная
    </UiText>

    <UiText
      tag="RouterLink"
      to="/faq/"
      size="m"
      strong
      responsive
    >
      FAQ
    </UiText>

    <UiText
      tag="a"
      href="#"
      target="_blank"
      size="m"
      strong
      left-icon="solid/twitter-logo-fill"
      responsive
      class="_twitter"
    >
      Twitter
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Navigation extends Vue {}
</script>

<style lang="scss" src="./Navigation.scss"></style>
