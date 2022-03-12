<template>
  <UiPanel
    size="s"
    :class="[
      'procedure-preview',
      `procedure-preview_size_${size}`,
      {'procedure-preview_selectable': selectable}
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
        {{ procedure.price | price }}
      </UiPrice>

      <UiText
        size="m"
        responsive
        class="procedure-preview__duration"
      >
        {{ procedure.duration | minutesToTime }}
      </UiText>

      <UiButton
        size="s"
        theme="info-outlined"
        :left-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
        class="procedure-preview__toggle"
        @click.native.stop="isOpened = !isOpened"
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
        {{ procedure.price | price }}
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: true,

  props: {
    size: {
      type: String,
      default: 'm'
    },

    procedure: {
      type: Object,
      required: true
    },

    selectable: {
      type: Boolean,
      default: false
    },

    selected: {
      type: Boolean,
      default: false
    }
  }
})
export default class ProcedurePreview extends Vue {
  readonly size!:
    | 's'
    | 'm'

  readonly procedure

  readonly selected!: boolean
  readonly selectable!: boolean

  isOpened = false
}
</script>

<style lang="scss" src="./ProcedurePreview.scss"></style>
