<template>
  <div class="procedures-page">
    <UiContainer>
      <Header
        class="procedures-page__header"
      />

      <UiPlaceholder
        v-if="isEmpty"
        title="Список послуг порожній"
        text="Додайте послугу, щоб розпочати роботу"
        :image="require('~/assets/images/procedures-empty.svg')"
      >
        <UiButton
          theme="blue"
          right-icon="outlined/plus"
          @click.native="onAddProcedure"
        >
          Додати послугу
        </UiButton>
      </UiPlaceholder>

      <ProceduresGroup
        v-for="(group, index) in grouped"
        :key="index"
        :index="index"
        :group="group"
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
      title: 'Список послуг - pullcrm'
    }
  }
})
export default class Procedures extends Vue {
  get isEmpty () {
    return this.grouped.length === 0
  }

  get grouped () {
    return this.$typedStore.state.procedures.grouped
  }

  onAddProcedure () {
    this.$typedStore.dispatch('popup/show', 'new-procedure')
  }
}
</script>

<style lang="scss" src="./ProceduresPage.scss"></style>
