<script lang="ts" setup>
const props = defineProps({
  hour: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const duration = inject<() => number>('duration')

const normalizeHour = computed(() => {
  return `${props.hour.format('HH:mm')} - ${props.hour.add(duration(), 'm').format('HH:mm')}`
})

const selectedTime = computed(() => {
  return route.query.time
})

const isActive = computed(() => {
  return selectedTime.value === props.hour.format('HH:mm')
})

function onPick() {
  router.replace({
    query: {
      ...route.query,
      time: props.hour.format('HH:mm'),
    },
  })
}
</script>

<template>
  <UiText
    tag="a"
    href="#"
    size="l"
    :class="[
      'full-widget-pick-date-page-time-picker-badge',
      { 'full-widget-pick-date-page-time-picker-badge_active': isActive },
    ]"
    @click.prevent="onPick"
  >
    {{ normalizeHour }}
  </UiText>
</template>

<style lang="scss" src="./TimePickerBadge.scss"></style>
