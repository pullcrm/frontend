<script lang="ts" setup>
import { HandleDirective as vHandle } from 'vue-slicksort'

import { formatPhone } from '~/utils/format-phone'

const props = defineProps({
  specialist: {
    type: Object,
    required: true,
  },
})

const user = computed(() => {
  return props.specialist.user
})

const avatar = computed(() => {
  return user.value.avatar?.path
})

const status = computed(() => {
  return props.specialist.status
})

const type = computed(() => {
  if (status.value === 'ALL')
    return 'green'

  if (status.value === 'DASHBOARD')
    return 'orange'

  return 'gray'
})
</script>

<template>
  <UiPanel
    :to="{
      name: 'specialistInfo',
      params: { slug: specialist.id },
    }"
    class="specialists-page-card"
    :class="[
      { 'specialists-page-card__inactive': specialist.user.active === false },
    ]"
  >
    <!-- <a
      href="#"
      class="specialists-page-card__edit"
    >
      <UiIcon
        name="outlined/pencil-simple"
        size="s"
      />
    </a> -->

    <div
      id="hand"
      v-handle
      class="specialists-page-card__hand"
      @click.prevent
    >
      <UiIcon
        name="outlined/hand-grabbing"
        size="s"
      />
    </div>

    <UiIndicator
      class="specialists-page-card__avatar"
      :type="type"
    >
      <UiAvatar
        :image="avatar"
        :name="specialist.fullName"
        size="l"
      />
    </UiIndicator>

    <UiText
      class="specialists-page-card__name"
      size="l"
      strong
    >
      {{ specialist.fullName }}
    </UiText>

    <UiText
      class="specialists-page-card__specialization"
      size="m"
    >
      {{ specialist.specialization }}
    </UiText>

    <UiText
      class="specialists-page-card__phone"
      size="m"
    >
      {{ formatPhone(user.phone) }}
    </UiText>
  </UiPanel>
</template>

<style lang="scss" src="./Card.scss"></style>
