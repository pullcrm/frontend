<template>
  <div
    class="ui-price"
    :class="[
      `ui-price_size_${size}`,
      { 'ui-price_responsive': responsive }
    ]"
  >
    <div
      v-if="$slots.prepend"
      class="ui-price__prepend"
    >
      <slot name="prepend" />
    </div>

    <div
      class="ui-price__content"
    >
      <slot />
    </div>

    <div
      v-if="$slots.append"
      class="ui-price__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    size: {
      type: String,
      default: 'm'
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Price extends Vue {
  readonly size:
    | 'xs'
    | 's'
    | 'm'
    | 'xl'
}
</script>

<style lang="scss" src="./Price.scss"></style>
