<script lang="ts" setup>
import { api } from '~/boot/api'

const props = defineProps({
  specialist: {
    type: Object,
    required: true,
  },
})

const toastsStore = useToastsStore()

const isLoading = ref(false)

const isVisible = computed(() => {
  return props.specialist.user.active === false
})

async function onSubmit() {
  try {
    isLoading.value = true

    await api.specialist.sendFinishLink(
      props.specialist.id,
    )

    toastsStore.show({ title: 'Відправлено' })
  }
  catch (err: any) {
    if (err.status === 400) {
      toastsStore.show({
        title: 'Реєстрація вже завершена',
        type: 'error',
      })

      return
    }

    if (err.status === 403) {
      toastsStore.show({
        title: 'Такого спеціаліста не існує',
        type: 'error',
      })

      return
    }

    throw err
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UiAlert
    v-if="isVisible"
    theme="warning"
    class="specialist-page-phone-confirmation"
  >
    <strong>Реєстрація не завершена!</strong> Відправити СМС з посиланям для завершення реєстрації?

    <template #append>
      <UiButton
        size="s"
        theme="yellow"
        :loading="isLoading"
        @click="onSubmit"
      >
        Відправити
      </UiButton>
    </template>
  </UiAlert>
</template>

<style lang="scss">
  .specialist-page-phone-confirmation {
    strong {
      font-weight: 600;
    }
  }
</style>
