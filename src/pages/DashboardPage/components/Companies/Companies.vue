<script lang="ts" setup>
import Company from './Company.vue'
import CompanyButton from './CompanyButton.vue'

const authStore = useAuthStore()
const positionStore = usePositionStore()

const companyId = computed(() => {
  return positionStore.companyId
})

const positions = computed(() => {
  return positionStore.positions
})

async function onPosition(position: any) {
  if (position.company.id === companyId.value)
    return

  await authStore.refreshTokenByPosition(position)

  location.reload()
}
</script>

<template>
  <div class="dashboard-page-companies">
    <UiTitle
      class="dashboard-page-companies__title"
      size="s"
      responsive
    >
      Мої компанії
    </UiTitle>

    <UiCarousel
      class="dashboard-page-companies__carousel"
    >
      <UiCarouselItem
        v-for="position in positions"
        :key="`company-${position.company.id}`"
      >
        <Company
          :position="position"
          @click="onPosition(position)"
        />
      </UiCarouselItem>

      <UiCarouselItem>
        <CompanyButton />
      </UiCarouselItem>
    </UiCarousel>
  </div>
</template>

<style lang="scss" src="./Companies.scss"></style>
