<template>
  <UiContainer>
    <div class="procedures-page__header">
      <UiTitle
        size="m"
        responsive
      >
        Список услуг
      </UiTitle>

      <UiButton
        theme="blue"
        responsive
        @click.native="onShowServicePopup"
      >
        Добавить услугу
      </UiButton>
    </div>

    <UiPanel
      class="procedures-page"
      size="s"
    >
      <UiPlaceholder
        v-if="isEmpty"
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

      <template
        v-else
      >
        <ProceduresTable
          :procedures="procedures"
        />
      </template>
    </UiPanel>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ProceduresTable from './components/ProceduresTable.vue'

@Component({
  components: {
    ProceduresTable
  }
})
export default class Procedures extends Vue {
  get procedures () {
    return this.$typedStore.state.procedures.procedures
  }

  get isEmpty () {
    return this.procedures.length === 0
  }

  onShowServicePopup () {
    this.$typedStore.dispatch('popup/show', 'procedure-new')
  }
}
</script>

<style lang="scss" src="./Procedures.scss"></style>
