<script lang="ts" setup>
defineProps({
  template: {
    type: String,
    required: true,
  },
})
</script>

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

          Повідомлення
        </UiText>

        <UiText
          size="m"
          responsive
          class="settings-page-sms-template__text_2"
        >
          Щойно
        </UiText>
      </div>

      <UiText
        size="l"
        strong
        class="settings-page-sms-template__title"
      >
        Pullcrm
      </UiText>

      <UiText
        size="m"
        responsive
      >
        {{ template }}
        <!-- <UiContenteditable
          :value="template"
          @input="$emit('update:template', $event)"
        /> -->
      </UiText>
    </UiPanel>

    <UiText
      v-if="$slots.disclaimer"
      size="m"
      responsive
      class="settings-page-sms-template__disclaimer"
    >
      <slot name="disclaimer" />
    </UiText>
  </div>
</template>

<style lang="scss" src="./SmsTemplate.scss"></style>
