<script lang="ts" setup>
import Avatars from './components/Avatars.vue'
import CreatedAt from './components/CreatedAt.vue'
import { copyText } from '~/utils/clipboard'
import { AVATAR } from '~/constants/files'
import { api } from '~/boot/api'

useMeta({
  title: 'Информація про спеціаліста - pullcrm',
})

const router = useRouter()

const toastsStore = useToastsStore()
const positionStore = usePositionStore()
const specialistStore = useSpecialistStore()

const isLoading = ref(false)

const avatars = computed(() => {
  return specialistStore.avatars
})

const specialist = computed(() => {
  return specialistStore.specialist
})

const companyId = computed(() => {
  return positionStore.companyId
})

const specialistId = computed(() => {
  return specialist.value.id
})

const user = computed(() => {
  return specialist.value.user
})

async function onSubmit() {
  try {
    isLoading.value = true

    const {
      id,
      user,
      status,
      description,
      specialization,
    } = specialist.value

    await api.specialist.update({
      id,
      email: user.email || undefined,
      status,
      fullName: user.fullName,
      description,
      specialization,
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

async function refresh() {
  const [avatars, specialist] = await Promise.all([
    api.files.all(user.value.id, {
      group: AVATAR,
    }),
    api.specialist.get(specialistId.value),
  ])

  specialistStore.avatars = avatars
  specialistStore.specialist = specialist
}

async function copyPersonalLink() {
  const { href } = router.resolve({
    name: 'fullWidgetSpecialistPage',
    query: {
      companyId: companyId.value,
      specialistId: specialistId.value,
    },
  })

  const { BASE_HOST } = process.env

  copyText(`https://${BASE_HOST}${href}`)

  await toastsStore.show({
    title: 'Посилання скопійовано',
  })
}
</script>

<template>
  <div class="specialist-info-page">
    <Avatars
      class="specialist-info-page__avatars"
      :avatars="avatars"
      :specialist="specialist"
      @refresh="refresh"
    />

    <form
      @submit.prevent="onSubmit"
    >
      <UiField
        label="Ім'я та Прізвище"
        required
      >
        <UiInput
          v-model="specialist.user.fullName"
          name="name"
          placeholder="Введіть Ім'я та Прізвище"
          required
          data-test="form-name"
        />
      </UiField>

      <UiField
        label="Телефон"
        required
      >
        <UiInput
          name="phone"
          mask="+38 (###) #### ###"
          type="phone"
          disabled
          inputmode="tel"
          left-icon="outlined/phone"
          :model-value="specialist.user.phone"
        />
      </UiField>

      <UiField
        label="Пошта"
      >
        <UiInput
          v-model="specialist.user.email"
          name="email"
          type="email"
          placeholder="Введіть почту"
        />
      </UiField>

      <UiField
        label="Спеціалізація"
      >
        <UiInput
          v-model="specialist.specialization"
          name="specialization"
          placeholder="Профіль спеціаліста"
        />
      </UiField>

      <UiField
        label="Опис"
      >
        <UiInput
          v-model="specialist.description"
          name="description"
          placeholder="Додайте опис"
          tag="textarea"
          data-test="form-description"
        />
      </UiField>

      <CreatedAt
        class="specialist-info-page__created-at"
        :created-at="specialist.createdAt"
      />

      <UiLink
        tag="UiText"
        size="l"
        theme="action"
        left-icon="outlined/link"
        class="specialist-info-page__widget"
        @click.prevent="copyPersonalLink"
      >
        Персональне посилання на сторінку запису
      </UiLink>

      <UiButton
        class="specialist-info-page__button"
        size="l"
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Зберегти
      </UiButton>
    </form>
  </div>
</template>

<style lang="scss" src="./InfoPage.scss"></style>
