<template>
  <div class="appointment-popup-client-simple">
    <UiTitle
      class="appointment-popup-client-simple__title"
      size="s"
      responsive
    >
      Клиент
    </UiTitle>

    <div class="appointment-popup-client-simple__inner">
      <UiField>
        <UiInput
          :value="value"
          placeholder="Введите имя или номер телефона"
          @input="
            $emit('input', $event)
            $emit('resetFieldError', 'name')
          "
        />
      </UiField>

      <UiButton
        size="m"
        theme="yellow"
        right-icon="outlined/caret-down"
      >
        Быстрая запись
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
export default class ClientSimple extends Vue {
  readonly value!: string
}
</script>

<style lang="scss">
  .appointment-popup-client-simple {
    &__title {
      margin-bottom: 12px;
    }

    &__inner {
      display: flex;

      .ui-field {
        width: 100%;
        margin-right: 16px;
      }
    }
  }
</style>
