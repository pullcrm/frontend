<script lang="ts" setup>
import { formatMoney } from '~/utils/money'
import { minutesToTime } from '~/utils/time'
// inheritAttrs: true,

defineProps({
  size: {
    type: String,
    default: 'm',
  },

  procedure: {
    type: Object,
    required: true,
  },

  selectable: {
    type: Boolean,
    default: false,
  },

  selected: {
    type: Boolean,
    default: false,
  },
})
// readonly size!:
// | 's'
// | 'm'

const isOpened = ref(false)
</script>

<template>
  <UiPanel
    size="s"
    class="procedure-preview" :class="[
      `procedure-preview_size_${size}`,
      { 'procedure-preview_selectable': selectable },
    ]"
    v-bind="$attrs"
  >
    <div class="procedure-preview__header">
      <UiCheckbox
        v-if="selectable"
        size="m"
        :value="selected"
      />

      <UiText
        :tag="selectable ? 'a' : 'div'"
        href="#"
        size="m"
        strong
        responsive
        class="procedure-preview__title"
      >
        {{ procedure.name }}
      </UiText>

      <UiPrice
        size="xs"
        class="procedure-preview__price"
      >
        {{ formatMoney(procedure.price) }}
      </UiPrice>

      <UiText
        size="m"
        responsive
        class="procedure-preview__duration"
      >
        {{ minutesToTime(procedure.duration) }}
      </UiText>

      <UiButton
        size="s"
        theme="info-outlined"
        :left-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
        class="procedure-preview__toggle"
        @click.stop="isOpened = !isOpened"
      />
    </div>

    <div
      v-show="isOpened"
      class="procedure-preview__body"
    >
      <UiPrice
        size="xs"
        class="procedure-preview__price"
      >
        {{ formatMoney(procedure.price) }}
      </UiPrice>

      <UiText
        size="m"
        responsive
        class="procedure-preview__description"
      >
        {{ procedure.description || 'Опис відсутній!' }}
      </UiText>
    </div>
  </UiPanel>
</template>

<style lang="scss" src="./ProcedurePreview.scss"></style>
