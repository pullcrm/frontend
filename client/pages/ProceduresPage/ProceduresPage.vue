<template>
  <div class="procedures-page">
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
        v-for="(procedures, categoryId) in proceduresByGroups"
        :key="categoryId"
        :category-id="+categoryId"
        :procedures="procedures"
        class="procedures-page__group"
      />

      <ProceduresGroup
        key="withoutGroup"
        :procedures="proceduresWithoutGroup"
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
  }
})
export default class Procedures extends Vue {
  get isEmpty () {
    return this.$typedStore.getters['procedures/isEmpty']
  }

  get proceduresByGroups () {
    return this.$typedStore.getters['procedures/byGroups']
  }

  get proceduresWithoutGroup () {
    return this.$typedStore.getters['procedures/withoutGroup']
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
