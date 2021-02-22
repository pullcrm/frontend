<template>
  <div class="appointment-popup-notify">
    <UiTitle
      class="appointment-popup-notify__title"
      size="s"
      responsive
    >
      СМС оповещение
    </UiTitle>

    <UiField
      v-if="type === 'new'"
    >
      <UiSwitch
        :value="hasCreationSms"
        size="m"
        @input="$emit('update:hasCreationSms', $event)"
      >
        <template #append>
          <UiText
            size="m"
            responsive
          >
            Сообщить о записи
          </UiText>
        </template>
      </UiSwitch>
    </UiField>

    <UiField>
      <UiSwitch
        :value="hasRemindSms"
        size="m"
        @input="$emit('update:hasRemindSms', $event)"
      >
        <template #append>
          <UiText
            size="m"
            responsive
          >
            Напомнить о записи за 45 мин до начала
          </UiText>
        </template>
      </UiSwitch>
    </UiField>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: {
      type: String,
      required: true
    },

    hasRemindSms: {
      type: Boolean,
      required: true
    },

    hasCreationSms: {
      type: Boolean,
      default: false
    }
  }
})
export default class Notify extends Vue {
  readonly type!: string
  readonly hasRemindSms!: boolean
  readonly hasCreationSms!: boolean
}
</script>

<style lang="scss">
  .appointment-popup-notify {
    &__title {
      margin-bottom: 12px;
    }

    .ui-field {
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>
