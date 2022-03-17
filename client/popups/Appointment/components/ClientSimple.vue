<template>
  <div class="appointment-popup-client-simple">
    <UiTitle
      class="appointment-popup-client-simple__title"
      size="s"
      responsive
    >
      Клієнт
    </UiTitle>

    <div class="ui-grid">
      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
      >
        <UiInput
          :value="name"
          placeholder="Введіть ім'я"
          @input="
            $emit('update:name', $event)
            $emit('resetFieldError', 'name')
          "
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
      >
        <UiInput
          mask="+38 (###) #### ###"
          :value="phone"
          inputmode="tel"
          placeholder="Введіть номер телефону"
          @input="
            $emit('update:phone', $event)
            $emit('resetFieldError', 'phone')
          "
        />
      </UiField>

      <!-- <UiButton
        size="m"
        theme="yellow"
        right-icon="outlined/caret-down"
      >
        Швидкий запис
      </UiButton> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: {
      type: String,
      default: ''
    },

    phone: {
      type: String,
      default: ''
    }
  }
})
export default class ClientSimple extends Vue {
  readonly name!: string
  readonly phone!: string
}
</script>

<style lang="scss">
  .appointment-popup-client-simple {
    &__title {
      margin-bottom: 12px;
    }
  }
</style>
