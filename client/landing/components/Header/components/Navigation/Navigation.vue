<template>
  <div class="landing-navigation">
    <UiText
      tag="RouterLink"
      to="/"
      size="m"
      strong
    >
      Головна
    </UiText>

    <!-- <UiText
      tag="RouterLink"
      to="/faq/"
      size="m"
      strong
    >
      FAQ
    </UiText> -->

    <UiText
      tag="a"
      href="https://t.me/pullcrm"
      target="_blank"
      size="m"
      strong
    >
      <template #prepend>
        <img
          src="~assets/images/t_logo.svg"
          width="18px"
          height="18px"
          alt="telegram"
        >
      </template>

      Telegram
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
