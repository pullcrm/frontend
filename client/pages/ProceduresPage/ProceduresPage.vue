<template>
  <div
    :class="[
      'procedures-page',
      {'procedures-page_one-category': categories.length <= 1}
    ]"
  >
    <UiContainer>
      <Header
        class="procedures-page__header"
      />

      <UiPlaceholder
        v-if="isEmpty"
        title="Список услуг пуст"
        text="Добавьте услугу, чтобы начать работу"
        :image="require('~/assets/images/procedures-empty.svg')"
      >
        <UiButton
          theme="blue"
          right-icon="outlined/plus"
          @click.native="onAddProcedure"
        >
          Добавить услугу
        </UiButton>
      </UiPlaceholder>

      <ProceduresGroup
        v-for="(category) in categories"
        :key="category.id"
        :category="category"
        class="procedures-page__group"
      />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Header from './components/Header.vue'
import ProceduresGroup from './components/Group.vue'

@Component({
  layout: 'dashboard',

  components: {
    Header,
    ProceduresGroup
  },

  head () {
    return {
      title: 'Список услуг - pullcrm'
    }
  }
})
export default class Procedures extends Vue {
  get isEmpty () {
    if (this.hasCategories) {
      return false
    }

    return this.$typedStore.getters['procedures/isEmpty']
  }

  get hasCategories () {
    return this.categories.length > 0
  }

  get categories () {
    return this.$typedStore.getters['procedures/categories']
  }

  onAddProcedure () {
    this.$typedStore.dispatch('popup/show', 'new-procedure')
  }

  onEditCategory () {
    this.$typedStore.dispatch('popup/show', 'new-procedure-category')
  }
}
</script>

<style lang="scss" src="./ProceduresPage.scss"></style>
