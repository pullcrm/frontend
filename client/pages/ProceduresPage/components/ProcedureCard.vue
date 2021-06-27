<template>
  <UiPanel
    tag="a"
    size="s"
    responsive
    href="#"
    class="procedures-page-procedure-card"
    @click.native.prevent="open"
  >
    <UiText
      size="l"
      strong
      responsive
      class="procedures-page-procedure-card__title"
    >
      {{ procedure.name }}
    </UiText>

    <UiText
      size="m"
      responsive
      class="procedures-page-procedure-card__sub-title"
    >
      {{ procedure.description || 'Описание отсутствует' }}
    </UiText>

    <div class="procedures-page-procedure-card__footer">
      <UiText
        size="m"
        responsive
        class="procedures-page-procedure-card__duration"
      >
        {{ procedure.duration | minutesToTime }}
      </UiText>

      <UiPrice
        size="s"
        responsive
        class="procedures-page-procedure-card__price"
      >
        {{ procedure.price | price }}
      </UiPrice>
    </div>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureCard extends Vue {
  readonly procedure

  async open () {
    await this.$typedStore.dispatch('popup/show', {
      name: 'edit-procedure',
      props: { procedure: this.procedure }
    })
  }
}
</script>

<style lang="scss" src="./ProcedureCard.scss"></style>
