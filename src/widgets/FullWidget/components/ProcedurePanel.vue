<script lang="ts" setup>
import xor from 'lodash/xor'
import { formatMoney } from '~/utils/money'
import { minutesToTime } from '~/utils/time'

const props = defineProps({
  procedure: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const activeProcedureIds = computed(() => {
  // @ts-expect-error
  return [].concat(route.query.procedureIds ?? []).map(Number)
})

const isActive = computed(() => {
  return activeProcedureIds.value.includes(props.procedure.id)
})

async function onSelect() {
  const procedureIds = xor(activeProcedureIds.value, [props.procedure.id])

  await router.replace({
    query: {
      ...route.query,
      procedureIds: procedureIds.map(String),
    },
  })
}
</script>

<template>
  <UiPanel
    size="s"
    class="base-widget-procedure-panel"
    @click.prevent="onSelect"
  >
    <UiText
      size="l"
      responsive
      class="base-widget-procedure-panel__left"
    >
      <template #prepend>
        <UiCheckbox
          size="m"
          :value="isActive"
        />
      </template>

      <a href="#">
        {{ procedure.name }}
      </a>
    </UiText>

    <UiText
      size="m"
      responsive
      class="base-widget-procedure-panel__center"
    >
      {{ minutesToTime(procedure.duration) }}
    </UiText>

    <UiPrice
      size="s"
      responsive
      class="base-widget-procedure-panel__right"
    >
      {{ formatMoney(procedure.price) }}
    </UiPrice>
  </UiPanel>
</template>

<style lang="scss" src="./ProcedurePanel.scss"></style>
