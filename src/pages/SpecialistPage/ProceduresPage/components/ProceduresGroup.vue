<script lang="ts" setup>
import type { IGroupItem } from '~/logics/procedures'

import ProcedurePreview from '~/components/ProcedurePreview/ProcedurePreview.vue'

interface IProps {
  group: IGroupItem
}

defineProps<IProps>()
</script>

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

<style lang="scss" src="./ProceduresGroup.scss"></style>
