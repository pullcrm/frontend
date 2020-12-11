<template>
  <RouterLink
    class="menu-item"
    :to="to"
  >
    <UiIcon
      :name="icon"
      size="s"
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
export default class MenuItem extends Vue {

}
</script>

<style lang="scss" src="./MenuItem.scss"></style>
