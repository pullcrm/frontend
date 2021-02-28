<template>
  <div
    class="ui-input-autocomplete-item"
    :class="{ 'ui-input-autocomplete-item_active': active }"
    data-test="ui-input-autocomplete-item"
  >
    <div>
      <UiIcon
        v-if="icon"
        size="m"
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    icon: {
      type: String,
      default: undefined
    },

    title: {
      type: String,
      default: undefined
    },

    subTitle: {
      type: String,
      default: undefined
    },

    active: {
      type: Boolean,
      default: undefined
    }
  }
})
export default class InputAutocompleteItem extends Vue {
  readonly icon: string
  readonly title: string
  readonly subTitle: string
  readonly active: boolean
}
</script>

<style lang="scss" src="./InputAutocompleteItem.scss"></style>
