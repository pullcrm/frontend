<template>
  <div class="specialist-procedures-page-procedures-group">
    <UiText
      size="m"
      strong
      responsive
      class="specialist-procedures-page-procedures-group__name"
    >
      {{ group.categoryTitle }}
    </UiText>

    <ProcedurePreview
      v-for="procedure in group.procedures"
      :key="`procedure-${procedure.id}`"
      :procedure="procedure"
      class="specialist-procedures-page-procedures-group__procedure-preview"
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
    }
  }
})
export default class ProceduresGroup extends Vue {
  readonly group: IGroupItem
}
</script>

<style lang="scss" src="./ProceduresGroup.scss"></style>
