<template>
  <div
    class="ui-tab-button-list"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class TabButtonList extends Vue {}
</script>

<style lang="scss" src="./TabButtonList.scss"></style>
