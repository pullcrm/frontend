<template>
  <UiPanel
    size="s"
    class="full-widget-company-panel"
  >
    <UiText
      size="m"
    >
      {{ company.name }}, {{ company.type.name }}
    </UiText>

    <UiText
      v-if="company.address"
      size="m"
      class="full-widget-company-panel__address"
    >
      {{ company.address }}
    </UiText>

    <UiText
      v-if="company.phone"
      tag="a"
      :href="`tel:${company.phone}`"
      size="m"
      class="full-widget-company-panel__phone"
    >
      {{ company.phone | formatPhone }}
    </UiText>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    company: {
      type: Object,
      required: true
    }
  }
})
export default class CompanyPanel extends Vue {
  readonly company
}
</script>

<style lang="scss" src="./CompanyPanel.scss"></style>
