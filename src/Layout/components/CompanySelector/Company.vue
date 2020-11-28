<template>
  <div
    class="base-layout-header-company"
    :class="{'_active' : company.id === companyId }"
  >
    <div class="base-layout-header-company__logo">
      <UiAvatar
        :image="logo"
        :name="company.name"
        size="s"
        type="rounded"
      />
    </div>
    <div class="base-layout-header-company__info">
      <UiText
        class="base-layout-header-company__name"
        size="m"
      >
        {{ company.name }}
      </UiText>

      <UiText size="s">
        {{ company.category.name }}, в городе {{ company.city.name }}
      </UiText>
    </div>
  </div>
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
export default class Company extends Vue {
  readonly company

  get companyId () {
    return this.$store.getters['company/current']?.id
  }

  get logo () {
    return this.company?.logo?.path
  }
}
</script>

<style lang="scss">
  .base-layout-header-company {
    display: flex;
    align-items: center;
    width: 280px;
    margin-bottom: 16px;
    padding: 8px 12px;
    color: $ui-black-100;
    background: $ui-black-20;
    border: 2px solid $ui-black-20;
    border-radius: 8px;
    cursor: pointer;

    &__logo {
      margin-right: 12px;
    }

    &__name {
      font-weight: 500;
    }

    &__text {
      @include ui-typo-12;
    }

    &._active {
      border: 2px solid $ui-blue-light-brand;
    }
  }
</style>
