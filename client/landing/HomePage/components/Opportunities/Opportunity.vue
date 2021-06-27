<template>
  <UiPanel
    size="m"
    responsive
    class="landing-home-page-opportunity"
  >
    <div
      :style="`background-color: ${color};`"
      class="landing-home-page-opportunity__icon"
    >
      <UiIcon
        :name="icon"
      />
    </div>

    <UiText
      size="l"
      responsive
      class="landing-home-page-opportunity__title"
    >
      {{ title }}
    </UiText>

    <UiText
      size="m"
      strong
      responsive
      class="landing-home-page-opportunity__description"
    >
      {{ description }}
    </UiText>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    icon: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  }
})
export default class Opportunity extends Vue {}
</script>

<style lang="scss" src="./Opportunity.scss"></style>
