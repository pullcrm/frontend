<template>
  <div class="procedures-page-header">
    <UiNotificationBadge
      class="procedures-page-header__title"
      :count="total"
    >
      <UiTitle
        size="l"
        responsive
      >
        Список послуг
      </UiTitle>
    </UiNotificationBadge>

    <div class="procedures-page-header__actions">
      <UiButton
        size="m"
        theme="info-outlined"
        responsive
        @click.native="onAddCategory"
      >
        Добавити категорію
      </UiButton>

      <UiButton
        size="m"
        theme="blue"
        responsive
        @click.native="onAddProcedure"
      >
        Добавити послугу
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Header extends Vue {
  get total () {
    return this.$typedStore.getters['procedures/total']
  }

  onAddProcedure () {
    this.$typedStore.dispatch('popup/show', 'new-procedure')
  }

  onAddCategory () {
    this.$typedStore.dispatch('popup/show', 'new-procedure-category')
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
