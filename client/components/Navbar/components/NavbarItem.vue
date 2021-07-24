<template>
  <Component
    :is="to ? 'RouterLink' : tag"
    class="navbar-item"
    :to="to"
  >
    <UiIcon
      :name="icon"
      size="s"
    />

    <span class="navbar-item__name">
      {{ name }}
    </span>
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    tag: {
      type: String,
      default: 'div'
    },

    to: {
      type: [Object, String],
      default: null
    },

    icon: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    }
  }
})
export default class NavbarItem extends Vue {
  readonly to
  readonly tag
  readonly icon
  readonly name
}
</script>

<style lang="scss" src="./NavbarItem.scss"></style>
