<template>
  <div class="landing-home-page-intro">
    <div class="landing-home-page-intro__info">
      <UiTitle
        tag="h1"
        size="l"
        class="landing-home-page-intro__title"
      >
        <span>Онлайн запись</span>
        И учет клиентов <br> для вашего бизнеса
      </UiTitle>

      <UiText
        size="m"
        class="landing-home-page-intro__text"
      >
        Используй простую систему учета клиентов, <br> с онлайн бронированием, абсолютно бесплатно.
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
          Подключить
        </UiButton>
      </div>
    </div>

    <div class="landing-home-page-intro__image">
      <UiButton
        v-show="false"
        size="m"
        theme="green"
        right-icon="solid/play-fill"
        class="landing-home-page-intro__video"
      >
        Посмотреть
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
}
</script>

<style lang="scss" src="./Intro.scss"></style>
