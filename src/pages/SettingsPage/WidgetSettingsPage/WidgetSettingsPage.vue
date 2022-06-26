<script lang="ts" setup>
import Section from '../components/Section.vue'
import { code, codeButton } from './code'
import { SMS_REMIND_DURATIONS } from '~/constants/time'

import { minutesToTime } from '~/utils/time'
import { api } from '~/boot/api'

useMeta({
  title: 'Налаштування онлайн запису - pullcrm',
})

const toastsStore = useToastsStore()
const positionStore = usePositionStore()

const settings = ref(positionStore.widgetSettings)

const companyId = computed(() => {
  return positionStore.companyId
})

const minTime = computed(() => {
  return {
    name: minutesToTime(settings.value.minutesBefore),
    value: settings.value.minutesBefore,
  }
})

const durationList = computed(() => {
  return SMS_REMIND_DURATIONS.map(minutes => ({
    name: minutesToTime(minutes),
    value: minutes,
  }))
})

const htmlCode = computed(() => {
  return code
    .trim()
    .replace('{ companyId }', companyId.value)
})

const htmlCodeButton = computed(() => {
  return codeButton.trim()
})

function setActive(event: boolean) {
  settings.value.isActive = event

  submit()
}

function setMinutesBefore(event: any) {
  settings.value.minutesBefore = event.value

  submit()
}

async function submit() {
  await api.settings.widgetUpdate(
    settings.value,
  )

  await toastsStore.show({
    title: 'Збережено!',
  })
}
</script>

<template>
  <div class="widget-settings-page">
    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="widget-settings-page__title"
      >
        Онлайн запис
      </UiTitle>

      <Section
        title="Увімкнути онлайн запис"
        sub-title="Дозволити користувачам записуватися через віджет"
      >
        <template #append>
          <UiSwitch
            :model-value="settings.isActive"
            size="m"
            @update:model-value="setActive"
          />
        </template>
      </Section>

      <UiDivider />

      <UiText
        class="widget-settings-page__time"
        size="l"
        responsive
      >
        <span>Клієнт може записатися на запис не раніше ніж за:</span>

        <UiSelect
          label-key="name"
          :model-value="minTime"
          :options="durationList"
          required
          :clearable="false"
          placeholder="Вибрати час"
          @update:model-value="setMinutesBefore"
        >
          <template #input="{ onFocus }">
            <UiText
              size="m"
              responsive
              right-icon="outlined/caret-down"
              @click="onFocus"
            >
              {{ minTime.name }} до початку
            </UiText>
          </template>
        </UiSelect>
      </UiText>
    </UiPanel>

    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="widget-settings-page__title"
      >
        Інтеграція віджету на вашому сайті
      </UiTitle>

      <UiContent
        class="widget-settings-page__code"
      >
        <p>
          Віджет дозволяє вибрати співробітника, послугу, доступний день та час для створення запису у межах вашої компанії.
        </p>

        <p>
          <strong>Скрипт для ініціалізації віджету</strong>
        </p>

        <pre>
          <code v-text="htmlCode" />
        </pre>

        <p>Для відкриття віджету, додайте на сайті тег із посиланням на сайт https://pullcrm.com, це посилання буде відкривати віджет.</p>

        <p>Посилання може мати будь-яку структуру, текст чи вкладеність.</p>

        <pre>
          <code
            v-text="htmlCodeButton"
          />
        </pre>

        <p>
          <strong>Зверніть увагу:</strong>
          Посилання не дозволяється закривати від індексації будь-якими способами, це єдине правило використання віджету.
        </p>
      </UiContent>
    </UiPanel>
  </div>
</template>

<style lang="scss" src="./WidgetSettingsPage.scss"></style>
