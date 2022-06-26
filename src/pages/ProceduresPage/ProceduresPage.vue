<script lang="ts" setup>
import Header from './components/Header.vue'
import ProceduresGroup from './components/Group.vue'

useMeta({
  title: 'Список послуг - pullcrm',
})

const popupStore = usePopupStore()
const proceduresStore = useProceduresStore()

const grouped = computed(() => {
  return proceduresStore.grouped
})

const isEmpty = computed(() => {
  return grouped.value.length === 0
})

function onAddProcedure() {
  popupStore.show('new-procedure')
}
</script>

<template>
  <div class="procedures-page">
    <UiContainer>
      <Header
        class="procedures-page__header"
      />

      <UiPlaceholder
        v-if="isEmpty"
        title="Список послуг порожній"
        text="Додайте послугу, щоб розпочати роботу"
        :image="require('~/assets/images/procedures-empty.svg')"
      >
        <UiButton
          theme="blue"
          right-icon="outlined/plus"
          @click="onAddProcedure"
        >
          Додати послугу
        </UiButton>
      </UiPlaceholder>

      <ProceduresGroup
        v-for="(group, index) in grouped"
        :key="index"
        :index="index"
        :group="group"
        class="procedures-page__group"
      />
    </UiContainer>
  </div>
</template>

<style lang="scss" src="./ProceduresPage.scss"></style>
