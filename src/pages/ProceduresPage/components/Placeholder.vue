<script lang="ts" setup>
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const popupStore = usePopupStore()

async function onAdd() {
  await popupStore.show({
    name: 'new-procedure',
    props: {
      category: props.category,
    },
  })
}
</script>

<template>
  <div class="ui-grid procedures-page-placeholder">
    <UiPanel
      tag="a"
      size="s"
      href="#"
      class="procedures-page-placeholder__panel"
      :class="[
        'ui-grid-item',
        'ui-grid-item_12',
        'ui-grid-item_tablet_6',
        'ui-grid-item_laptop_3',
      ]"
      @click.prevent="onAdd"
    >
      <UiText
        size="m"
        right-icon="outlined/plus"
        responsive
      >
        Додати послугу
      </UiText>
    </UiPanel>
  </div>
</template>

<style lang="scss">
  .procedures-page-placeholder {
    &__panel {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
      color: $ui-blue-brand;
    }
  }
</style>
