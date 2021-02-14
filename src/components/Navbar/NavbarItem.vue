<template>
  <RouterLink
    class="navbar-item"
    :to="to"
  >
    <UiIcon
      :name="icon"
      size="m"
    />
  </RouterLink>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    to: {
      type: [Object, String],
      required: true
    },

    icon: {
      type: String,
      required: true
    }
  }
})
export default class NavbarItem extends Vue {

}
</script>

<style lang="scss" src="./NavbarItem.scss"></style>
