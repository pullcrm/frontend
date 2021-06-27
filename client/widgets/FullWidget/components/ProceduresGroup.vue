<template>
  <div class="base-widget-procedures-group">
    <UiText
      tag="a"
      href="#"
      size="l"
      responsive
      :right-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
      class="base-widget-procedures-group__title"
      @click.native.prevent="isOpened = !isOpened"
    >
      {{ title }}
    </UiText>

    <div
      v-show="isOpened"
      class="base-widget-procedures-group__inner"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
export default class ProceduresGroup extends Vue {
  readonly title!: string

  isOpened = true
}
</script>

<style lang="scss" src="./ProceduresGroup.scss"></style>
