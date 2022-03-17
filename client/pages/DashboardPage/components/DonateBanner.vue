<template>
  <UiPanel
    class="dashboard-donate-banner"
    size="m"
    responsive
  >
    <UiTitle
      class="dashboard-donate-banner__title"
      size="xl"
      responsive
    >
      Збираємо гроші на функціонал списку клієнтів компанії!
    </UiTitle>

    <img
      class="dashboard-donate-banner__image"
      src="~/assets/images/money-draw.svg"
    >

    <div class="dashboard-donate-banner__actions">
      <UiButton
        theme="yellow"
        responsive
        @click.native="onSubscribe"
      >
        Допомогти проекту
      </UiButton>
    </div>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class DonateBanner extends Vue {
  async onSubscribe () {
    const result = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Ми перенаправимо вас на сторінку донатів',
      acceptButtonTitle: 'Відкрити'
    })

    if (result) {
      window.open('https://send.monobank.ua/jar/89hdzFyxLD', '_blank')
    }
  }
}
</script>

<style lang="scss">
  .dashboard-donate-banner {
    position: relative;
    background-color: $ui-black-20;

    &__title {
      margin-bottom: 16px;
    }

    &__image {
      display: none;
    }

    &__actions {
      display: flex;

      .ui-button {
        margin-right: 16px;
      }
    }

    @media (min-width: $ui-laptop) {
      &__title {
        max-width: 550px;
        margin-bottom: 32px;
      }

      &__image {
        position: absolute;
        top: 50%;
        right: 40px;
        display: block;
        transform: translateY(-50%);
      }
    }

    @media (min-width: $ui-desktop) {
      &__image {
        right: 184px;
      }
    }
  }
</style>
