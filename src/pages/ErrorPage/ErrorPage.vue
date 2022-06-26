<script lang="ts" setup>
const props = defineProps({
  error: {
    type: Object,
    default: null,
  },
})

const router = useRouter()

const status = computed(() => {
  if (!props.error)
    return 404

  return props.error.statusCode
})

function goHome() {
  const { href } = router.resolve({
    name: 'landing',
  })

  window.location.href = href
}

function onReload() {
  window.location.reload()
}
</script>

<template>
  <div class="error-page">
    <UiContainer>
      <UiPlaceholder
        v-if="status === 404"
        title="404"
        text="Сторінка не знайдена"
        image="/app/static/img/404.svg"
      >
        <UiButton
          theme="info-outlined"
          @click="goHome"
        >
          Перейти на головну
        </UiButton>
      </UiPlaceholder>

      <UiPlaceholder
        v-else
        title="Сайт тимчасово не доступний"
        image="/app/static/img/server-error.svg"
      >
        <template #text>
          Спробуйте повторити запит пізніше <br>

          Email для зв'язку:
          <UiLink
            tag="a"
            theme="action"
            href="mailto:admin@pullcrm.com"
          >
            admin@pullcrm.com
          </UiLink>
        </template>

        <UiButton
          theme="blue"
          @click="onReload"
        >
          Оновити сторінку
        </UiButton>
      </UiPlaceholder>
    </UiContainer>
  </div>
</template>

<style lang="scss">
  .error-page {
    display: flex;
    align-items: center;
    min-height: calc(100vh - 200px);
    padding: 50px 0;

    .ui-placeholder__title {
      max-width: 100%;
    }
  }
</style>
