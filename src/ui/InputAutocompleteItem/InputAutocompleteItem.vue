<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: undefined,
  },

  title: {
    type: String,
    default: undefined,
  },

  subTitle: {
    type: String,
    default: undefined,
  },

  active: {
    type: Boolean,
    default: undefined,
  },
})

const root = ref<HTMLElement | null>(null)

defineExpose({ root })
</script>

<template>
  <div
    ref="root"
    class="ui-input-autocomplete-item"
    :class="{ 'ui-input-autocomplete-item_active': active }"
    data-test="ui-input-autocomplete-item"
  >
    <div>
      <UiIcon
        v-if="icon"
        size="s"
        :name="icon"
        class="ui-input-autocomplete-item__icon"
        data-test="ui-input-autocomplete-item-icon"
      />

      <div class="ui-input-autocomplete-item__inner">
        <UiText
          size="m"
          class="ui-input-autocomplete-item__title"
          data-test="ui-input-autocomplete-item-title"
        >
          {{ title }}
        </UiText>

        <UiText
          v-if="subTitle"
          size="s"
          class="ui-input-autocomplete-item__sub-title"
          data-test="ui-input-autocomplete-item-sub-title"
        >
          {{ subTitle }}
        </UiText>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./InputAutocompleteItem.scss"></style>
