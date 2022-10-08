<script lang="ts" setup>
import { CANCELED, COMPLETED, IN_PROGRESS, IN_QUEUE } from '~/constants/appointment'

import { statusesDict } from '~/logics/appointment'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
})

defineEmits(['update:status'])

const activeStatus = computed(() => {
  return statusesDict[props.status as keyof typeof statusesDict]
})

const statuses = computed(() => {
  return [COMPLETED, CANCELED, IN_PROGRESS, IN_QUEUE]
    .map(value => ({
      name: statusesDict[value as keyof typeof statusesDict],
      value,
    }))
})
</script>

<template>
  <div class="appointment-popup-header">
    <UiTitle
      class="appointment-popup-header__title"
      size="l"
      responsive
    >
      {{ title }}
    </UiTitle>

    <UiPopover
      ref="popover"
      size="m"
      placement="bottom_end"
    >
      <UiText
        class="appointment-popup-header__status"
        tag="a"
        href="#"
        size="l"
        right-icon="outlined/caret-down"
        responsive
      >
        {{ activeStatus }}
      </UiText>

      <template #body="{ close }">
        <UiDropdownList>
          <UiText
            v-for="item in statuses"
            :key="item.value"
            tag="a"
            href="#"
            size="m"
            :left-icon="item.value === status ? 'outlined/check' : 'outlined/minus'"
            @click.prevent="close(), $emit('update:status', item.value)"
          >
            {{ item.name }}
          </UiText>
        </UiDropdownList>
      </template>
    </UiPopover>
  </div>
</template>

<style lang="scss">
  .appointment-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__status {
      color: $ui-blue-brand;
    }
  }
</style>
