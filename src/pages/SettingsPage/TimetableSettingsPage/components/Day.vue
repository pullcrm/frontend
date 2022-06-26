<script lang="ts" setup>
import { getWorkingHours } from '~/utils/time'

import { getLocaleDayByAlias } from '~/logics/date'
import { api } from '~/boot/api'

const props = defineProps({
  from: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  opened: {
    type: Boolean,
    required: true,
  },

  dayAlias: {
    type: String,
    required: true,
  },
})

const baseStore = useBaseStore()
const timetableStore = useTimetableStore()

const day = computed(() => {
  return getLocaleDayByAlias(props.dayAlias)
})

const timeOptions = getWorkingHours('07:00', '23:00')

async function onUpdate(key: string, value: string | boolean) {
  try {
    baseStore.loading = true

    const options: Record<string, string | boolean> = {
      opened: props.opened,
      from: props.from,
      to: props.to,
    }

    options[key] = String(value)

    await api.timetable.update({
      [props.dayAlias]: Object.values(options).join(';'),
    })

    await timetableStore.fetch()
  }
  finally {
    baseStore.loading = false
  }
}
</script>

<template>
  <div class="timetable-settings-page-day">
    <UiSwitch
      :model-value="opened"
      size="m"
      class="timetable-settings-page-day__switch"
      @update:model-value="onUpdate('opened', $event)"
    >
      <template #append>
        <UiText
          size="l"
          responsive
        >
          {{ day }}
        </UiText>
      </template>
    </UiSwitch>

    <div class="timetable-settings-page-day__selectors">
      <UiSelect
        :model-value="from"
        :options="timeOptions"
        required
        :disabled="!opened"
        placeholder="Час відкриття"
        class="timetable-settings-page-day__select"
        @update:model-value="onUpdate('from', $event)"
      />

      <UiText
        size="l"
        responsive
        class="timetable-settings-page-day__text"
      >
        до
      </UiText>

      <UiSelect
        :model-value="to"
        :options="timeOptions"
        required
        :disabled="!opened"
        placeholder="Час закриття"
        class="timetable-settings-page-day__select"
        @update:model-value="onUpdate('to', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./Day.scss"></style>
