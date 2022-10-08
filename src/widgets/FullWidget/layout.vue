<script lang="ts">
export default {
  async preFetch({ currentRoute }: any) {
    const companyId = Number(currentRoute.query.companyId || 0)

    const widgetStore = useWidgetStore()

    await Promise.all([
      widgetStore.fetchCompany(companyId),
    ])
  },

  setup() {
    const router = useRouter()

    const hasBack = computed(() => {
      return true
      // return Boolean(locationStore.from)
    })

    function onBack() {
      router.go(-1)
    }

    return {
      onBack,
      hasBack,
    }
  },
}
</script>

<template>
  <div class="full-widget-layout">
    <div class="full-widget-layout__container">
      <UiBack
        v-if="hasBack"
        class="full-widget-layout__back"
        @click="onBack"
      />

      <RouterView />
    </div>

    <div class="full-widget-layout__footer">
      <a
        href="https://pullcrm.com"
        target="_blank"
        class="full-widget-layout__logo"
      >
        <img
          src="/static/img/logo.svg"
          alt="pullcrm"
        >
      </a>

      <UiText
        size="m"
        responsive
        class="full-widget-layout__disclaimer"
      >
        <strong>Pullcrm</strong> — зручний інструмент автоматизації запису для вашої компанії
      </UiText>
    </div>
  </div>
</template>

<style lang="scss" src="./layout.scss"></style>
