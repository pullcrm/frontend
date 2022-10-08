<script lang="ts" setup>
const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const isActive = computed(() => {
  return props.day.format('YYYY-MM-DD') === route.query.date
})

function onPick() {
  router.replace({
    query: {
      ...route.query,
      date: props.day.format('YYYY-MM-DD'),
      time: undefined,
    },
  })
}
</script>

<template>
  <a
    href="#"
    :class="[
      'full-widget-date-picker-item',
      { 'full-widget-date-picker-item_active': isActive },
    ]"
    @click.prevent="onPick"
  >
    <UiText
      size="l"
      class="full-widget-date-picker-item__day"
    >
      {{ day.format('dd') }}
    </UiText>

    <UiText
      size="l"
      class="full-widget-date-picker-item__date"
    >
      {{ day.format('DD') }}
    </UiText>
  </a>
</template>

<style lang="scss" src="./DatePickerItem.scss"></style>
