<template>
  <div class="bs-london-widget-order">
    <UiTitle
      class="bs-london-widget-order__title"
      size="l"
    >
      Інформація про запис
    </UiTitle>

    <div class="bs-london-widget-order__info">
      <UiText
        size="l"
      >
        Дата та час: <strong>{{ date | formatDate('D MMMM') }}, {{ startTime }}</strong>
      </UiText>

      <UiText
        size="l"
      >
        Майстер: <strong>{{ specialist.user.firstName }}</strong>
      </UiText>

      <UiText
        size="l"
      >
        Послуга: <strong>
          {{ procedure.name }} - {{ procedure.price | price }}
        </strong>
      </UiText>
    </div>

    <UiAlert
      left-icon="alert/circle"
      theme="info"
    >
      Ми нагадаємо вам про запис за годину до початку
    </UiAlert>

    <UiButton
      theme="yellow"
      @click.native="reload"
    >
      Добавити ще один запис
    </UiButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    },

    specialist: {
      type: Object,
      required: true
    },

    date: {
      type: Object,
      required: true
    },

    startTime: {
      type: String,
      required: true
    }
  }
})
export default class Order extends Vue {
  readonly date: any
  readonly startTime: any
  readonly procedure: any
  readonly specialist: any

  reload () {
    window.location.reload()
  }
}
</script>

<style lang="scss">
  .bs-london-widget-order {
    &__title {
      margin-bottom: 24px;
      color: $ui-white;
    }

    &__info {
      margin-bottom: 16px;
      color: $ui-white;

      .ui-text {
        margin-bottom: 4px;
      }

      strong {
        font-weight: 700;
      }
    }

    .ui-alert {
      margin: 24px 0;
      color: $ui-black-100;
      background: $ui-white;
      border: none;
    }

    .ui-button {
      width: 100%;
    }
  }
</style>
