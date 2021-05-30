<template>
  <div class="settings-page-sms-template">
    <UiPanel
      size="s"
      responsive
      class="settings-page-sms-template__inner"
    >
      <div class="settings-page-sms-template__header">
        <UiText
          size="l"
          responsive
          class="settings-page-sms-template__text_1"
        >
          <template #prepend>
            <UiIcon
              size="xs"
              name="solid/chat-circle-dots-fill"
            />
          </template>

          Сообщение
        </UiText>

        <UiText
          size="m"
          responsive
          class="settings-page-sms-template__text_2"
        >
          Только что
        </UiText>
      </div>

      <UiText
        size="l"
        strong
        class="settings-page-sms-template__title"
      >
        PullCRM
      </UiText>

      <UiText
        size="m"
        responsive
      >
        <UiContenteditable
          :value="template"
          @input="$emit('update:template', $event)"
        />
      </UiText>
    </UiPanel>

    <UiText
      v-if="disclaimer"
      size="m"
      responsive
      class="settings-page-sms-template__disclaimer"
    >
      {{ disclaimer }}
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    template: {
      type: String,
      required: true
    },

    disclaimer: {
      type: String,
      default: ''
    }
  }
})
export default class SmsTemplate extends Vue {
  readonly disclaimer?: string
}
</script>

<style lang="scss" src="./SmsTemplate.scss"></style>
