<script lang="ts" setup>
import { SPECIALIST } from '~/constants/roles'

const router = useRouter()

const authStore = useAuthStore()
const positionStore = usePositionStore()

const role = computed(() => {
  return positionStore.role
})

const isVisible = computed(() => {
  return role.value.name === SPECIALIST
})

const companyId = computed(() => {
  return positionStore.companyId
})

const positions = computed(() => {
  return [
    ...positionStore.positions
      .map((item) => {
        return {
          ...item,
          title: item.company.name,
        }
      }),
    {
      title: 'Створити нову компанію',
      id: 0,
    },
  ]
})

const position = computed(() => {
  return positions.value.find((item) => {
    return item.company.id === companyId.value
  })
})

async function fetch(position: any) {
  if (position.id === 0) {
    return router.push({
      name: 'companyCreate',
    })
  }

  await authStore.refreshTokenByPosition(position)

  const { href } = router.resolve({
    name: 'dashboard',
  })

  window.location.href = href
}
</script>

<template>
  <div
    v-if="isVisible"
    class="specialist-page-company-picker"
  >
    <UiSelect
      :model-value="position"
      :options="positions"
      label-key="title"
      placeholder="Ваші компанії"
      @update:model-value="fetch"
    />
  </div>
</template>
