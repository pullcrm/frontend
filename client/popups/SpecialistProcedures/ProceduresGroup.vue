<template>
  <div class="specialist-procedures-procedures-group">
    <UiText
      size="m"
      strong
      responsive
      class="specialist-procedures-procedures-group__name"
    >
      {{ group.categoryTitle }}
    </UiText>

    <ProcedurePreview
      v-for="procedure in group.procedures"
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

import { IGroupItem } from '~/logics/procedures'

import ProcedurePreview from '~/components/ProcedurePreview/ProcedurePreview.vue'

@Component({
  components: {
    ProcedurePreview
  },

  props: {
    group: {
      type: Object,
      required: true
    },

    procedureIds: {
      type: Array,
      default: () => []
    }
  }
})
export default class ProceduresGroup extends Vue {
  readonly group: IGroupItem
  readonly procedureIds: number[]

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
