<template>
  <BaseWidgetLayout
    class="base-widget-order"
    has-back
  >
    <UiTitle
      class="base-widget-order__title"
      size="l"
    >
      Інформація про запис
    </UiTitle>

    <div class="base-widget-order__info">
      <UiText
        size="l"
      >
        Дата та час: <strong>{{ order.date | formatDate('D MMMM') }}, {{ order.startTime }}</strong>
      </UiText>

      <UiText
        size="l"
      >
        Майстер: <strong>{{ order.specialist.user.firstName }}</strong>
      </UiText>

      <UiText
        size="l"
      >
        Послуга: <strong>
          {{ order.procedure.name }} - {{ order.procedure.price | price }}
        </strong>
      </UiText>
    </div>

    <UiAlert
      left-icon="outlined/warning-circle"
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
  </BaseWidgetLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import BaseWidgetLayout from '../../components/Layout.vue'

@Component({
  components: {
    BaseWidgetLayout
  }
})
export default class BasaWidgetOrder extends Vue {
  get order () {
    return this.$typedStore.state.widget.order
  }

  reload () {
    const { href } = this.$router.resolve({
      ...this.$route,
      name: 'BaseWidgetSpecialists'
    })

    window.location.href = href
  }
}
</script>

<style lang="scss">
.base-widget-order {
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
