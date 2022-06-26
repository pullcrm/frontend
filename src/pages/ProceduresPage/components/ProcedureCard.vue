<script lang="ts" setup>
import { HandleDirective as vHandle } from 'vue-slicksort'

import { minutesToTime } from '~/utils/time'
import { formatMoney } from '~/utils/money'

const props = defineProps({
  procedure: {
    type: Object,
    required: true,
  },
})

const popupStore = usePopupStore()

async function open() {
  await popupStore.show({
    name: 'edit-procedure',
    props: { procedure: props.procedure },
  })
}
</script>

<template>
  <UiPanel
    tag="a"
    size="s"
    responsive
    href="#"
    class="procedures-page-procedure-card"
    @click.prevent="open"
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
          {{ minutesToTime(procedure.duration) }}
        </UiText>

        <UiPrice
          size="s"
          responsive
          class="procedures-page-procedure-card__price"
        >
          {{ formatMoney(procedure.price) }}
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

<style lang="scss" src="./ProcedureCard.scss"></style>
