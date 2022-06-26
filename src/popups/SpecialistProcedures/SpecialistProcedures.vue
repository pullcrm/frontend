<script lang="ts" setup>
import ProceduresGroup from './ProceduresGroup.vue'
import { groupByCategory } from '~/logics/procedures'
import { api } from '~/boot/api'

interface IProps {
  specialist: any
}

const props = defineProps<IProps>()
const emit = defineEmits(['close'])

const toastsStore = useToastsStore()
const proceduresStore = useProceduresStore()
const specialistStore = useSpecialistStore()

const isLoading = ref(false)
const procedureIds = ref(
  props.specialist.procedures.map(({ id }: any) => id),
)

const procedures = computed(() => {
  return proceduresStore.procedures
})

const categories = computed(() => {
  return proceduresStore.categories
})

const items = computed(() => {
  return groupByCategory(procedures.value, categories.value)
})

async function onSubmit() {
  try {
    isLoading.value = true

    const { id } = props.specialist

    await api.specialist.setProcedures(id, {
      procedures: procedureIds.value,
    })

    await toastsStore.show({ title: 'Збережено!' })
    await specialistStore.fetch(id)

    emit('close')
  }
  finally {
    isLoading.value = false
  }
}
</script>

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
          v-model:procedure-ids="procedureIds"
          :group="item"
          class="specialist-procedures__procedures-group"
        />

        <UiButton
          size="m"
          theme="blue"
          :loading="isLoading"
          class="specialist-procedures__button"
          @click="onSubmit"
        >
          Застосувати ({{ procedureIds.length }})
        </UiButton>
      </div>
    </UiPopup>
  </UiPopupBackdrop>
</template>

<style lang="scss" src="./SpecialistProcedures.scss"></style>
