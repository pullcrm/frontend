<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: '',
  },

  phone: {
    type: String,
    default: '',
  },
})

defineEmits(['update:name', 'update:phone'])
</script>

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
          'ui-grid-item_tablet_6',
        ]"
      >
        <UiInput
          :model-value="name"
          placeholder="Введіть ім'я"
          @update:model-value="
            $emit('update:name', $event)
          "
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
        ]"
      >
        <UiInput
          mask="+38 (###) #### ###"
          :model-value="phone || ''"
          inputmode="tel"
          placeholder="Введіть номер телефону"
          @update:model-value="
            $emit('update:phone', $event)
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

<style lang="scss">
  .appointment-popup-client-simple {
    &__title {
      margin-bottom: 12px;
    }
  }
</style>
