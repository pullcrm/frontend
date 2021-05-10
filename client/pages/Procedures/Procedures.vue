<template>
  <div class="procedures-page">
    <UiContainer>
      <div class="procedures-page__header">
        <UiTitle
          size="m"
          responsive
        >
          Список услуг
        </UiTitle>

        <div class="procedures-page__actions">
          <UiButton
            theme="info-outlined"
            responsive
            @click.native="onAddCategory"
          >
            Добавить категорию
          </UiButton>

          <UiButton
            theme="blue"
            responsive
            @click.native="onAddProcedure"
          >
            Добавить услугу
          </UiButton>
        </div>
      </div>

      <UiPanel
        v-if="isEmpty"
        size="s"
      >
        <UiPlaceholder
          title="У вас пока нету услуг"
          text="Чтобы начать работу нужно добавить хотя бы одну услугу."
          :image="require('~/assets/images/empty.svg')"
        >
          <UiButton
            theme="blue"
            @click.native="onShowServicePopup"
          >
            Добавить чтобы начать
          </UiButton>
        </UiPlaceholder>
      </UiPanel>

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

import ProceduresGroup from './components/ProceduresGroup.vue'

@Component({
  layout: 'dashboard',

  components: {
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

  onAddCategory () {
    this.$typedStore.dispatch('popup/show', 'new-procedure-category')
  }

  onEditCategory () {
    this.$typedStore.dispatch('popup/show', 'new-procedure-category')
  }
}
</script>

<style lang="scss" src="./Procedures.scss"></style>
