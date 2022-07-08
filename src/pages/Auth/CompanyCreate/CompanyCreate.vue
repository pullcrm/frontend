<script lang="ts" setup>
import { api } from '~/boot/api'
import Layout from '~/pages/Auth/components/Layout.vue'

useMeta({
  title: 'Нова компанія - pullcrm',
})

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const baseStore = useBaseStore()
const positionStore = usePositionStore()

const company = ref<Record<string, any>>({
  name: '',
  city: null,
  type: null,
})

const isLoading = ref(false)

const cities = ref<any[]>([])
const companyTypes = ref<any[]>([])

const hasPositions = computed(() => {
  return positionStore.hasPositions
})

onBeforeMount(async () => {
  const result = await Promise.all([
    api.cities.all(),
    api.companyTypes.all(),
  ])

  cities.value = result[0]
  companyTypes.value = result[1]
})

onMounted(() => {
  const type = companyTypes.value.find(({ id }) => {
    return id === Number(route.query.companyType)
  })

  if (type)
    company.value.type = type
})

async function submit() {
  try {
    isLoading.value = true

    const { id: companyId } = await api.companies.create({
      name: company.value.name,
      cityId: company.value.city.id,
      typeId: company.value.type.id,
    })

    await onCompany(companyId)

    const { href } = router.resolve({
      name: 'dashboard',
    })

    window.location.href = href
  }
  finally {
    isLoading.value = false
  }
}

async function onCompany(companyId: number) {
  await baseStore.fetchProfile()

  const position = positionStore.positionsDict[companyId]

  await authStore.refreshTokenByPosition(position)
}

async function onBack() {
  await router.push({
    name: 'dashboard',
  })
}
</script>

<template>
  <Layout
    title="Створення компанії"
    sub-title="Вкажіть інформацію про компанію"
    class="auth-page-company-create"
  >
    <form
      @submit.prevent="submit"
    >
      <UiBack
        v-if="hasPositions"
        class="auth-page-company-create__back"
        @click="onBack"
      />

      <UiField
        label="Назва компанії"
        required
      >
        <UiInput
          v-model="company.name"
          left-icon="outlined/pencil"
          placeholder="Ваша компанія"
          required
        />
      </UiField>

      <UiField
        label="Місто"
        required
      >
        <UiSelect
          v-model="company.city"
          required
          :options="cities"
          label-key="name"
          placeholder="Вибрати місто"
        />
      </UiField>

      <UiField
        label="Категорія"
        required
      >
        <UiSelect
          v-model="company.type"
          label-key="name"
          placeholder="Вибрати категорію"
          :options="companyTypes"
          required
        />
      </UiField>

      <UiButton
        class="auth-page-company-create__button"
        type="submit"
        size="l"
        theme="blue"
        :loading="isLoading"
      >
        Продовжити
      </UiButton>
    </form>
  </Layout>
</template>

<style lang="scss" src="./CompanyCreate.scss"></style>
