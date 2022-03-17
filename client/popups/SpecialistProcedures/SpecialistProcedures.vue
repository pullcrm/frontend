<template>
  <UiPopupBackdrop
    class="specialist-procedures"
    @close="$emit('close')"
  >
    <UiPopup
      class="specialist-procedures__popup"
      @close="$emit('close')"
    >
      <UiTitle
        class="specialist-procedures__title"
        size="s"
      >
        Список послуг
      </UiTitle>

      <UiText
        class="specialist-procedures__sub-title"
        size="m"
      >
        Виберіть перелік послуг, які надає спеціаліст
      </UiText>

      <div class="specialist-procedures__inner">
        <ProceduresGroup
          v-for="(item, index) in items"
          :key="index"
          :group="item"
          :procedure-ids.sync="procedureIds"
          class="specialist-procedures__procedures-group"
        />

        <UiButton
          size="m"
          theme="blue"
          :loading="isLoading"
          class="specialist-procedures__button"
          @click.native="onSubmit"
        >
          Застосувати ({{ procedureIds.length }})
        </UiButton>
      </div>
    </UiPopup>
  </UiPopupBackdrop>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { groupByCategory } from '~/logics/procedures'

import ProceduresGroup from './ProceduresGroup.vue'

@Component({
  components: {
    ProceduresGroup
  },

  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureEdit extends Vue {
  readonly specialist

  isLoading = false
  procedureIds = []

  constructor () {
    super()

    this.procedureIds = this.specialist.procedures.map(({ id }) => id)
  }

  get procedures () {
    return this.$typedStore.state.procedures.procedures
  }

  get categories () {
    return this.$typedStore.state.procedures.categories
  }

  get items () {
    return groupByCategory(this.procedures, this.categories)
  }

  async onSubmit () {
    try {
      this.isLoading = true

      const { id } = this.specialist

      await this.$api.specialist.setProcedures(id, {
        procedures: this.procedureIds
      })

      await this.$typedStore.dispatch('toasts/show', { title: 'Збережено!' })
      await this.$typedStore.dispatch('specialists/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./SpecialistProcedures.scss"></style>
