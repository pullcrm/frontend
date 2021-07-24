<template>
  <div class="specialist-procedures-page-procedures-group">
    <UiText
      size="m"
      strong
      responsive
      class="specialist-procedures-page-procedures-group__name"
    >
      {{ categoryName }}
    </UiText>

    <ProcedurePreview
      v-for="procedure in procedures"
      :key="`procedure-${procedure.id}`"
      :procedure="procedure"
      class="specialist-procedures-page-procedures-group__procedure-preview"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ProcedurePreview from '../../components/ProcedurePreview.vue'

@Component({
  components: {
    ProcedurePreview
  },

  props: {
    procedures: {
      type: Array,
      default: () => []
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

  get category () {
    return this.$typedStore.getters['procedures/categoriesDict'][this.categoryId]
  }

  get categoryName () {
    return this.category?.name ?? 'Без категории'
  }
}
</script>

<style lang="scss" src="./ProceduresGroup.scss"></style>
