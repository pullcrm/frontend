<template>
  <div class="ui-content">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Content extends Vue {}
</script>

<style lang="scss" src="./Content.scss"></style>

<style lang="scss" src="./Content.desktop.scss"></style>

<style lang="scss" src="./Content.mobile.scss"></style>
