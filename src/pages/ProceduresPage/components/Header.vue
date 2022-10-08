<script lang="ts" setup>
const popupStore = usePopupStore()
const proceduresStore = useProceduresStore()

const total = computed(() => {
  return proceduresStore.total
})

function onAddProcedure() {
  popupStore.show('new-procedure')
}

function onAddCategory() {
  popupStore.show('new-procedure-category')
}
</script>

<template>
  <div class="procedures-page-header">
    <UiNotificationBadge
      class="procedures-page-header__title"
      :count="total"
    >
      <UiTitle
        size="l"
        responsive
      >
        Список послуг
      </UiTitle>
    </UiNotificationBadge>

    <div class="procedures-page-header__actions">
      <UiButton
        size="m"
        theme="info-outlined"
        responsive
        @click="onAddCategory"
      >
        Додати категорію
      </UiButton>

      <UiButton
        size="m"
        theme="blue"
        responsive
        @click="onAddProcedure"
      >
        Додати послугу
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss" src="./Header.scss"></style>
