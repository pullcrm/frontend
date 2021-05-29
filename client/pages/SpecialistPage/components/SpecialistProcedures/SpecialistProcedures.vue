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
        Список услуг
      </UiTitle>

      <UiText
        class="specialist-procedures__sub-title"
        size="m"
      >
        Выберите перечень услуг которые вы предоставляете
      </UiText>

      <div class="specialist-procedures__inner">
        <ProceduresGroup
          v-for="(procedures, categoryId) in proceduresByCategory"
          :key="categoryId"
          :procedures="procedures"
          :category-id="Number(categoryId)"
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
          Применить ({{ procedureIds.length }})
        </UiButton>
      </div>
    </UiPopup>
  </UiPopupBackdrop>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { groupByCategoryId } from '~/logics/procedures'

import ProceduresGroup from './components/ProceduresGroup.vue'

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

  get proceduresByCategory () {
    return groupByCategoryId(this.procedures)
  }

  async onSubmit () {
    try {
      this.isLoading = true

      const { id } = this.specialist

      await this.$api.specialist.setProcedures(id, {
        procedures: this.procedureIds
      })

      await this.$typedStore.dispatch('toasts/show', { title: 'Сохранено!' })
      await this.$typedStore.dispatch('specialists/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./SpecialistProcedures.scss"></style>
