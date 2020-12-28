<template>
  <UiTitle
    class="base-layout-header-company-selector"
    size="s"
    responsive
  >
    <template #prepend>
      <UiAvatar
        class="base-layout-header-company-selector__avatar"
        :image="logo"
        :name="company.name"
        size="s"
      />
    </template>

    {{ company.name }}

    <UiPrice
      v-if="balance !== null"
      size="s"
      responsive
    >
      ( {{ balance | price }} )
    </UiPrice>

    <template #append>
      <UiIcon
        name="arrow/chevron/down"
        size="s"
      />
    </template>
  </UiTitle>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class CompanySelector extends Vue {
  get company () {
    return this.$store.getters['company/current']
  }

  get logo () {
    return this.company?.logo?.path
  }

  get balance () {
    return this.$store.state.sms.balance
  }
}
</script>

<style lang="scss">
  .base-layout-header-company-selector {
    cursor: pointer;

    .ui-title__content {
      @include ellipsis(2);
    }

    .ui-title__append {
      color: $ui-black-80;
    }

    .ui-price {
      display: inline-flex;
    }
  }
</style>
