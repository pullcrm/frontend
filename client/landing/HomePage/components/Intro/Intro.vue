<template>
  <div class="landing-home-page-intro">
    <div class="landing-home-page-intro__info">
      <UiTitle
        tag="h1"
        size="l"
        class="landing-home-page-intro__title"
      >
        <span>Онлайн запис</span>
        І облік клієнтів <br> для вашого бізнесу
      </UiTitle>

      <UiText
        size="m"
        class="landing-home-page-intro__text"
      >
        Використовуй зручну систему обліку клієнтів, <br> з онлайн бронюванням, абсолютно безкоштовно.
      </UiText>

      <div class="landing-home-page-intro__actions">
        <UiButton
          v-for="type in types"
          :key="type.id"
          :to="{
            name: 'registration',
            query: {
              companyType: type.id
            }
          }"
          size="m"
          theme="info-outlined"
        >
          {{ type.name }}
        </UiButton>

        <UiButton
          :to="{ name: 'registration' }"
          size="m"
          theme="blue"
          right-icon="outlined/arrow-right"
        >
          Підключитись
        </UiButton>
      </div>
    </div>

    <div class="landing-home-page-intro__image">
      <UiButton
        size="m"
        theme="green"
        right-icon="solid/play-fill"
        class="landing-home-page-intro__video"
        @click.native="openVideo"
      >
        Подивитись
      </UiButton>

      <img
        src="/static/img/landing-intro.png"
        alt="pullcrm intro image"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    types: {
      type: Array,
      default: () => []
    }
  }
})
export default class Intro extends Vue {
  readonly types

  openVideo () {
    this.$typedStore.dispatch('popup/show', 'youtube-intro')
  }
}
</script>

<style lang="scss" src="./Intro.scss"></style>
