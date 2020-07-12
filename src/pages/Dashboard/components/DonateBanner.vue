<template>
  <UiPanel class="dashboard-donate-banner">
    <UiTitle
      class="dashboard-donate-banner__title"
      size="xl"
    >
      Собираем деньги на функционал списка клиентов компании!
    </UiTitle>

    <img
      class="dashboard-donate-banner__image"
      src="@/assets/images/money-draw.svg"
    >

    <div class="dashboard-donate-banner__actions">
      <UiButton
        theme="yellow"
        @click.native="onSubscribe"
      >
        Помочь проекту
      </UiButton>

      <!-- <UiButton
        theme="gray"
      >
        Что это, и как это будет выглядеть
      </UiButton> -->
    </div>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class DonateBanner extends Vue {
  async onSubscribe () {
    const result = await this.$store.dispatch('popup/askQuestion', {
      title: 'Мы отправим вас на страницу оплаты',
      acceptButtonTitle: 'Хорошо'
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

    &.ui-panel {
      background-color: $ui-black-20;
    }

    &__image {
      position: absolute;
      top: 50%;
      right: 184px;
      transform: translateY(-50%);
    }

    &__title {
      width: 600px;
      margin-bottom: 32px;
    }

    &__actions {
      display: flex;

      .ui-button {
        margin-right: 16px;
      }
    }
  }
</style>
