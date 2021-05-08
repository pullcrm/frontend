<template>
  <div class="landing-home-page-feature-item">
    <img
      :src="image"
      :alt="title"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    image: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  }
})
export default class FeatureItem extends Vue {
  readonly image!: string
  readonly title!: string
}
</script>

<style lang="scss" src="./FeatureItem.scss"></style>
