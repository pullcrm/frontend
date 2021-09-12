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
      Pullcrm это инструмент для бизнеса в сфере предоставления услуг, который поможет концентрироваться на сервисе, а решение части проблем процесса записи клиентов, мы в лице инструмента, возьмем на себя
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
        Хочешь наладить процессы в бизнесе? <br> Подключайся и начинай тратить время на действительно важные вещи!
      </UiTitle>

      <UiButton
        :to="{ name: 'registration' }"
        size="m"
        theme="blue"
      >
        Подключить
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
