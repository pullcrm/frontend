<template>
  <div class="specialist-procedures-procedures-group">
    <UiText
      size="m"
      strong
      responsive
      class="specialist-procedures-procedures-group__name"
    >
      {{ categoryName }}
    </UiText>

    <ProcedurePreview
      v-for="procedure in procedures"
      :key="`procedure-${procedure.id}`"
      size="s"
      :procedure="procedure"
      :selected="isSelected(procedure)"
      selectable
      class="specialist-procedures-procedures-group__procedure-preview"
      @click.native.prevent="onAdd(procedure)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ProcedurePreview from '~/components/ProcedurePreview/ProcedurePreview.vue'

@Component({
  components: {
    ProcedurePreview
  },

  props: {
    procedures: {
      type: Array,
      default: () => []
    },

    procedureIds: {
      type: Array,
      default: () => {}
    },

    categoryId: {
      type: Number,
      default: null
    }
  }
})
export default class ProceduresGroup extends Vue {
  readonly categoryId: number | null
  readonly procedures: any[]
  readonly procedureIds: number[]

  get category () {
    return this.$typedStore.getters['procedures/categoriesDict'][this.categoryId]
  }

  get categoryName () {
    return this.category?.name ?? 'Без категории'
  }

  onAdd (procedure) {
    const ids = [...this.procedureIds]

    if (this.isSelected(procedure)) {
      ids.splice(ids.indexOf(procedure.id), 1)

      this.$emit('update:procedureIds', ids)

      return
    }

    this.procedureIds.push(procedure.id)
  }

  isSelected (procedure) {
    return this.procedureIds.includes(procedure.id)
  }
}
</script>

<style lang="scss" src="./ProceduresGroup.scss"></style>
