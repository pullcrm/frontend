<template>
  <UiPanel
    size="m"
    responsive
    class="landing-home-page-about"
  >
    <UiTitle
      size="m"
      responsive
      class="landing-home-page-about__title"
    >
      Pullcrm це інструмент для бізнесу у сфері надання послуг, який допоможе концентруватися на сервісі, а вирішення частини проблем процесу запису клієнтів ми, як інструмент, візьмемо на себе
    </UiTitle>

    <UiPanel
      size="l"
      class="landing-home-page-about__action"
    >
      <UiTitle
        size="s"
        responsive
        class="landing-home-page-about__text"
      >
        Хочеш налагодити процеси у бізнесі? <br> Підключайся витрачай час на справді важливі речі!
      </UiTitle>

      <UiButton
        :to="{ name: 'registration' }"
        size="m"
        theme="blue"
      >
        Підключитись
      </UiButton>
    </UiPanel>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class About extends Vue {}
</script>

<style lang="scss" src="./About.scss"></style>
