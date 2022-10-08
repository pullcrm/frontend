<script lang="ts" setup>
import { minutesToTime } from '~/utils/time'

defineProps({
  type: {
    type: String,
    required: true,
  },

  hasRemindSms: {
    type: Boolean,
    required: true,
  },

  hasCreationSms: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:hasCreationSms', 'update:hasRemindSms'])

const smsStore = useSmsStore()

const remindTime = computed(() => {
  return smsStore.settings.remindSMSMinutes
})
</script>

<template>
  <div class="appointment-popup-notify">
    <UiTitle
      class="appointment-popup-notify__title"
      size="s"
      responsive
    >
      СМС оповіщення
    </UiTitle>

    <UiField
      v-if="type === 'new'"
    >
      <UiSwitch
        :model-value="hasCreationSms"
        size="m"
        @update:model-value="$emit('update:hasCreationSms', $event)"
      >
        <template #append>
          <UiText
            size="m"
            responsive
          >
            Повідомити про запис
          </UiText>
        </template>
      </UiSwitch>
    </UiField>

    <UiField>
      <UiSwitch
        :model-value="hasRemindSms"
        size="m"
        @update:model-value="$emit('update:hasRemindSms', $event)"
      >
        <template #append>
          <UiText
            size="m"
            responsive
          >
            Нагадати про запис за {{ minutesToTime(remindTime) }} до початку
          </UiText>
        </template>
      </UiSwitch>
    </UiField>
  </div>
</template>

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
