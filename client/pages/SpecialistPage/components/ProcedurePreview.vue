<template>
  <UiPanel
    size="s"
    :class="[
      'specialist-page-procedure-preview',
      `specialist-page-procedure-preview_size_${size}`
    ]"
    v-bind="$attrs"
  >
    <div class="specialist-page-procedure-preview__header">
      <UiIcon
        v-if="selectable"
        :class="{'_selected': selected}"
        class="specialist-page-procedure-preview__icon"
        name="solid/check-circle-fill"
        size="s"
      />

      <UiText
        size="m"
        strong
        responsive
        class="specialist-page-procedure-preview__title"
      >
        {{ procedure.name }}
      </UiText>

      <UiPrice
        size="xs"
        class="specialist-page-procedure-preview__price"
      >
        {{ procedure.price | price }}
      </UiPrice>

      <UiText
        size="m"
        responsive
        class="specialist-page-procedure-preview__duration"
      >
        {{ procedure.duration | minutesToTime }}
      </UiText>

      <UiButton
        size="s"
        theme="info-outlined"
        :left-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
        class="specialist-page-procedure-preview__toggle"
        @click.native.stop="isOpened = !isOpened"
      />
    </div>

    <div
      v-show="isOpened"
      class="specialist-page-procedure-preview__body"
    >
      <UiPrice
        size="xs"
        class="specialist-page-procedure-preview__price"
      >
        {{ procedure.price | price }}
      </UiPrice>

      <UiText
        size="m"
        responsive
        class="specialist-page-procedure-preview__description"
      >
        {{ procedure.description || 'Описание отсутствует!' }}
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
