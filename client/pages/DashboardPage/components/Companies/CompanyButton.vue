<template>
  <UiPanel
    class="dashboard-page-company-button"
    :to="{ name: 'companyCreate' }"
    size="s"
    responsive
  >
    <UiText
      size="m"
      responsive
      right-icon="outlined/plus"
    >
      Добавить компанию
    </UiText>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class CompanyButton extends Vue {}
</script>

<style lang="scss">
  .dashboard-page-company-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: $ui-brand-blue;
    transition: border-color $ui-transition;

    &:hover {
      border-color: $ui-brand-blue;
    }
  }
</style>
