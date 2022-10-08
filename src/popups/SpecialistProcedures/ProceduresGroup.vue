<script lang="ts" setup>
import type { IGroupItem } from '~/logics/procedures'

import ProcedurePreview from '~/components/ProcedurePreview/ProcedurePreview.vue'

interface IProps {
  group: IGroupItem
  procedureIds: number[]
}

const props = defineProps<IProps>()
const emit = defineEmits(['update:procedure-ids'])

const procedureIds = computed(() => props.procedureIds || [])

function isSelected(procedure: any) {
  return procedureIds.value.includes(procedure.id)
}

function onAdd(procedure: any) {
  const ids = [...procedureIds.value]

  if (isSelected(procedure)) {
    ids.splice(ids.indexOf(procedure.id), 1)

    emit('update:procedure-ids', ids)

    return
  }

  emit('update:procedure-ids', [...procedureIds.value, procedure.id])
}
</script>

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
      @click.prevent="onAdd(procedure)"
    />
  </div>
</template>

<style lang="scss" src="./ProceduresGroup.scss"></style>
