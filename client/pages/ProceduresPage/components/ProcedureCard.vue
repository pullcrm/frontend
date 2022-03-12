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
      {{ procedure.description || 'Опис відсутній' }}
    </UiText>

    <div class="procedures-page-procedure-card__footer">
      <div class="procedures-page-procedure-card__info">
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

      <div
        id="hand"
        v-handle
        class="procedures-page-procedure-card__hand"
      >
        <UiIcon
          name="outlined/hand-grabbing"
          size="s"
        />
      </div>
    </div>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { HandleDirective } from 'vue-slicksort'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    }
  },

  directives: {
    handle: HandleDirective
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
