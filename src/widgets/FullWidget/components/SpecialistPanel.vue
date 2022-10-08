<script lang="ts" setup>
const props = defineProps({
  specialist: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const user = computed(() => {
  return props.specialist.user
})

const avatar = computed(() => {
  return user.value.avatar?.path
})

const fullName = computed(() => {
  return user.value.fullName
})

async function onPick() {
  await router.push({
    name: 'fullWidgetProceduresPage',
    query: {
      ...route.query,
      specialistId: props.specialist.id,
    },
  })
}

async function onSpecialist() {
  const { companyId } = route.query

  await router.push({
    name: 'fullWidgetSpecialistPage',
    query: {
      companyId,
      specialistId: props.specialist.id,
    },
  })
}
</script>

<template>
  <UiPanel
    size="s"
    class="full-widget-specialist-panel"
    @click.prevent="onPick"
  >
    <UiAvatar
      :image="avatar"
      :name="fullName"
      size="m"
      class="full-widget-specialist-panel__image"
    />

    <div class="full-widget-specialist-panel__info">
      <UiText
        tag="a"
        href="#"
        size="l"
        strong
        responsive
        class="full-widget-specialist-panel__name"
      >
        {{ fullName }}
      </UiText>

      <UiText
        v-if="specialist.specialization"
        size="m"
        responsive
        class="full-widget-specialist-panel__specialization"
      >
        {{ specialist.specialization }}
      </UiText>
    </div>

    <a
      href="#"
      class="full-widget-specialist-panel__link"
      @click.prevent.stop="onSpecialist"
    >
      <UiIcon
        size="m"
        name="outlined/info"
      />
    </a>
  </UiPanel>
</template>

<style lang="scss" src="./SpecialistPanel.scss"></style>
