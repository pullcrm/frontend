<script lang="ts" setup>
import { api } from '~/boot/api'
import { ADMIN, MANAGER, SPECIALIST } from '~/constants/roles'

import { roles, statuses } from '~/logics/specialist'

const router = useRouter()

const authStore = useAuthStore()
const popupStore = usePopupStore()
const toastsStore = useToastsStore()
const positionStore = usePositionStore()
const specialistStore = useSpecialistStore()
const specialistsStore = useSpecialistsStore()

const specialist = ref(specialistStore.specialist)
const specialistRole = ref(roles[specialist.value.role.name as keyof typeof roles])

const isLoading = ref(false)

const status = computed({
  get() {
    return statuses[specialist.value.status as keyof typeof statuses]
  },

  set(val: any) {
    specialist.value.status = val.name
  },
})

const statusList = computed(() => {
  return Object.values(statuses)
})

const role = computed(() => {
  return positionStore.role
})

const isStatusDisabled = computed(() => {
  return role.value.name === SPECIALIST
})

const specialistId = computed(() => {
  return specialist.value.id
})

const availableRoles = computed(() => {
  return [
    roles[MANAGER],
    roles[SPECIALIST],
  ]
})

const positionId = computed(() => {
  return positionStore.currentId
})

const isMyProfile = computed(() => {
  return specialistId.value === positionId.value
})

const isDeletable = computed(() => {
  return (
    role.value.name === ADMIN
    && isMyProfile.value === false
  )
})

const isRoleDisable = computed(() => {
  if (specialist.value.role.name === ADMIN)
    return true

  return role.value.name === SPECIALIST
})

async function onSubmit() {
  try {
    isLoading.value = true

    await api.specialist.update({
      id: specialist.value.id,
      role: specialistRole.value.value,
      status: specialist.value.status,
    })

    toastsStore.show({ title: 'Збережено!' })

    refresh()
  }
  catch (err: any) {
    toastsStore.show({
      title: `Помилка: ${err.message}`,
      type: 'error',
    })
  }
  finally {
    isLoading.value = false
  }
}

async function onLogout() {
  const result = await popupStore.askQuestion({
    title: 'Ви дійсно бажаєте завершити сеанс?',
    acceptButtonTitle: 'Вийти',
  })

  if (result) {
    await authStore.logout()

    const { href } = router.resolve({
      name: 'login',
    })

    window.location.href = href
  }
}

async function onRemove() {
  const result = await popupStore.askQuestion({
    title: 'Ви дійсно бажаєте видалити профіль співробітника? Ця дія не зворотня!',
    acceptButtonTitle: 'Видалити!',
  })

  if (result) {
    await api.specialist.remove(specialistId.value)

    const { href } = router.resolve({
      name: 'specialists',
    })

    window.location.href = href
  }
}

async function refresh() {
  await specialistsStore.fetch()

  specialist.value = specialistsStore.byId(specialistId.value)
}
</script>

<template>
  <div class="specialist-settings-page">
    <form @submit.prevent="onSubmit">
      <UiField
        label="Доступність для запису"
        required
      >
        <UiSelect
          v-model="status"
          :options="statusList"
          label-key="value"
          required
          :disabled="isStatusDisabled"
        />
      </UiField>

      <UiField
        label="Роль"
        required
      >
        <UiSelect
          v-model="specialistRole"
          :options="availableRoles"
          label-key="name"
          :disabled="isRoleDisable"
          required
        />
      </UiField>

      <UiButton
        class="specialist-settings-page__button"
        size="l"
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Зберегти
      </UiButton>

      <UiButton
        v-if="isMyProfile"
        class="specialist-settings-page__button"
        size="l"
        theme="danger-outlined"
        @click="onLogout"
      >
        Вийти
      </UiButton>

      <template v-if="isDeletable">
        <UiDivider />

        <UiButton
          class="specialist-settings-page__button"
          size="l"
          theme="danger-outlined"
          @click="onRemove"
        >
          Видалити співробітника
        </UiButton>
      </template>
    </form>
  </div>
</template>

<style lang="scss" src="./SettingsPage.scss"></style>
