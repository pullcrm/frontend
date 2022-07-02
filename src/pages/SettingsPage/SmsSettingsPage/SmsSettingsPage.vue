<script lang="ts" setup>
import Section from '../components/Section.vue'
import SmsTemplate from '../components/SmsTemplate.vue'
import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'
import type { IHistoryItem } from '~/services/api'
import { SITE_EMAIL, SMS_CREATION_TEMPLATE, SMS_REMIND_TEMPLATE } from '~/constants'
import { SMS_REMIND_DURATIONS } from '~/constants/time'
import { formatMoney } from '~/utils/money'
import { formatDate } from '~/utils/date-time'
import { debounce } from '~/utils/debounce'
import { minutesToTime } from '~/utils/time'
import { normalizeSmsSettingsParams } from '~/logics/company'
import { api, apiClient } from '~/boot/api'

useMeta({
  title: 'Налаштування СМС - pullcrm',
})

const smsStore = useSmsStore()
const popupStore = usePopupStore()
const toastsStore = useToastsStore()

let history = reactive<IHistoryItem[]>([])

const isLoading = ref(false)

onMounted(async () => {
  const { data } = await api.balance.history({
    offset: 0,
    limit: 20,
  })

  history = data
})

const settings = computed(() => {
  return smsStore.settings
})

const balance = computed(() => {
  return smsStore.balance
})

const isAuthorize = computed(() => {
  return smsStore.isAuthorize
})

const smsRemindTemplate = computed(() => {
  return settings.value.remindSMSTemplate || SMS_REMIND_TEMPLATE
})

const smsCreationTemplate = computed(() => {
  return settings.value.creationSMSTemplate || SMS_CREATION_TEMPLATE
})

const remindTime = computed(() => {
  return {
    name: minutesToTime(settings.value.remindSMSMinutes),
    value: settings.value.remindSMSMinutes,
  }
})

const durationList = computed(() => {
  return SMS_REMIND_DURATIONS.map(minutes => ({
    name: minutesToTime(minutes),
    value: minutes,
  }))
})

async function onReplenishBalance() {
  const {
    MINIMUM_DEPOSIT_AMOUNT,
    MAXIMUM_DEPOSIT_AMOUNT,
  } = process.env

  // TODO: Check type of result value
  const amount = await popupStore.askQuestion({
    title: 'Вкажіть суму для поповнення',
    input: {
      type: 'number',
      value: MINIMUM_DEPOSIT_AMOUNT,
      min: MINIMUM_DEPOSIT_AMOUNT,
      max: MAXIMUM_DEPOSIT_AMOUNT,
    },
    acceptButtonTitle: 'Поповнити',
  })

  if (amount) {
    const result = await apiClient.balanceCheckout({
      amount: Number(amount),
    })

    const newWindow: any = window.open()

    newWindow.document.body.innerHTML = result
    newWindow.document.body.querySelector('form').submit()
  }
}

async function onActivate() {
  try {
    isLoading.value = true

    await api.sms.settingCreate({
      hasRemindSMS: true,
      hasCreationSMS: false,
      remindSMSMinutes: 60,
      remindSMSTemplate: SMS_REMIND_TEMPLATE,
      creationSMSTemplate: SMS_CREATION_TEMPLATE,
    })

    window.location.reload()
  }
  catch {
    toastsStore.show({
      type: 'error',
      title: 'Щось не так!',
    })
  }
  finally {
    isLoading.value = false
  }
}

const onSubmit = debounce(async () => {
  try {
    await api.sms.settingUpdate(
      normalizeSmsSettingsParams(settings.value),
    )
  }
  catch {
    toastsStore.show({
      type: 'error',
      title: 'Щось не так!',
    })
  }
}, 200)
</script>

<template>
  <div class="sms-settings-page">
    <template v-if="isAuthorize">
      <UiAlert
        type="info"
        left-icon="outlined/warning-circle"
        class="sms-settings-page__alert"
      >
        Для змінити тексту шаблону СМС зверніться в <UiLink theme="action" :href="`mailto:${SITE_EMAIL}`">
          технічну підтримку
        </UiLink>.
      </UiAlert>

      <InfoPanel
        class="sms-settings-page__balance"
        icon="outlined/wallet"
        theme="green"
      >
        <UiText
          size="m"
          responsive
        >
          Баланс
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ formatMoney(balance) }}
        </UiTitle>

        <template #append>
          <UiButton
            size="m"
            theme="blue"
            responsive
            @click="onReplenishBalance"
          >
            Поповнити баланс
          </UiButton>
        </template>
      </InfoPanel>

      <UiPanel
        size="m"
        responsive
      >
        <UiAccordion
          class="sms-settings-page__accordion"
        >
          <template #default="{ openItem, toggleItem, isItemOpened }">
            <UiAccordionItem
              name="history"
              :open-item="openItem"
              :toggle-item="toggleItem"
              :is-item-opened="isItemOpened"
            >
              <template #toggle>
                <UiText
                  size="l"
                  strong
                  responsive
                >
                  Історія поповнень
                </UiText>
              </template>

              <UiTable
                :data="history"
                numbered
              >
                <template #default="{ row }">
                  <UiTableColumn
                    name="Дата поповнення"
                    align="left"
                  >
                    <UiText
                      size="m"
                      responsive
                    >
                      {{ formatDate(row.createdAt, 'DD.MM.YYYY') }}
                    </UiText>
                  </UiTableColumn>

                  <UiTableColumn
                    name="Ціна"
                    align="right"
                  >
                    <UiText
                      size="m"
                      responsive
                    >
                      {{ formatMoney(row.amount) }}
                    </UiText>
                  </UiTableColumn>
                </template>
              </UiTable>
            </UiAccordionItem>
          </template>
        </UiAccordion>
      </UiPanel>

      <UiPanel
        size="m"
        responsive
      >
        <UiTitle
          size="s"
          responsive
          class="sms-settings-page__title"
        >
          Налаштування СМС
        </UiTitle>

        <Section
          title="Ви авторизовані в СМС-сервісі"
          sub-title="Доступні функції надсилання користувачам повідомлень про статуси записів"
        />
      </UiPanel>

      <UiPanel
        size="m"
        responsive
      >
        <Section
          title="Повідомити клієнта після створення запису"
          sub-title="СМС відправиться через 2 хвилини після створення запису"
        >
          <template #append>
            <UiSwitch
              v-model="settings.hasCreationSMS"
              size="m"
              @update:model-value="onSubmit"
            />
          </template>
        </Section>

        <SmsTemplate
          class="sms-settings-page__sms-template"
          :template="smsCreationTemplate"
          @update:template="settings.creationSMSTemplate = $event"
        >
          <!-- <template #disclaimer>
            Використовуйте аліаси для генерації даних: <br>
            %date% - дата в форматі "28.06"; <br>
            %time% - час початку запису; <br>
            %specialist% - ім'я спеціаліста; <br>
            %procedures% - список вибраних послуг через кому.
          </template> -->
        </SmsTemplate>
      </UiPanel>

      <UiPanel
        size="m"
        responsive
      >
        <Section
          title="Повідомити клієнта перед записом"
        >
          <template #append>
            <UiSwitch
              v-model="settings.hasRemindSMS"
              size="m"
              @update:model-value="onSubmit"
            />
          </template>
        </Section>

        <UiText
          class="sms-settings-page__notify-selector"
          size="l"
          responsive
        >
          Уведомлять за:

          <template #append>
            <UiSelect
              label-key="name"
              :options="durationList"
              required
              :clearable="false"
              placeholder="Вибрати час"
              :model-value="remindTime"
              @update:model-value="($event: any) => {
                settings.remindSMSMinutes = $event.value;

                onSubmit()
              }"
            >
              <template #input="{ onFocus }">
                <UiText
                  size="m"
                  responsive
                  right-icon="outlined/caret-down"
                  @click="onFocus"
                >
                  {{ remindTime.name }} до початку
                </UiText>
              </template>
            </UiSelect>
          </template>
        </UiText>

        <SmsTemplate
          class="sms-settings-page__sms-template"
          :template="smsRemindTemplate"
          @update:template="settings.remindSMSTemplate = $event"
        >
          <!-- <template #disclaimer>
            Використовуйте аліаси для генерації даних: <br>
            %date% - дата в форматі "28.06"; <br>
            %time% - час початку запису; <br>
            %specialist% - ім'я спеціаліста; <br>
            %procedures% - список вибраних послуг через кому.
          </template> -->
        </SmsTemplate>
      </UiPanel>
    </template>

    <UiPanel
      v-else
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="sms-settings-page__title"
      >
        Налаштування СМС
      </UiTitle>

      <Section
        title="Авторизація в СМС-сервісі"
        sub-title="Активуйте функцію надсилання користувачам повідомлень про майбутні записи"
      >
        <template #append>
          <UiButton
            size="s"
            theme="blue"
            :loading="isLoading"
            @click="onActivate"
          >
            Активувати
          </UiButton>
        </template>
      </Section>
    </UiPanel>
  </div>
</template>

<style lang="scss" src="./SmsSettingsPage.scss"></style>
