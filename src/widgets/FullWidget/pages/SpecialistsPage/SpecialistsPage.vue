<script lang="ts" setup>
import SpecialistPanel from '../../components/SpecialistPanel.vue'

const widgetStore = useWidgetStore()

const specialists = computed(() => {
  return widgetStore.specialists
})
</script>

<script lang="ts">
export default {
  async preFetch(_ctx: any) {
    const widgetStore = useWidgetStore()

    await widgetStore.fetchSpecialists()
  },
}
</script>

<template>
  <div class="full-widget-specialists-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-specialists-page__title"
    >
      Виберіть спеціаліста
    </UiTitle>

    <SpecialistPanel
      v-for="specialist in specialists"
      :key="specialist.id"
      :specialist="specialist"
      class="full-widget-specialists-page__specialist-panel"
    />
  </div>
</template>

<style lang="scss" src="./SpecialistsPage.scss"></style>
