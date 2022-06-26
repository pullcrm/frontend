<template>
  <SettingsLayout
    class="sms-settings-page"
  >
    <template v-if="isAuthorize">
      <UiAlert
        type="info"
        left-icon="outlined/warning-circle"
        class="sms-settings-page__alert"
      >
        Для змінити тексту шаблону СМС зверніться в технічну підтримку
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
          {{ balance | price }}
        </UiTitle>

        <template #append>
          <UiButton
            size="m"
            theme="blue"
            responsive
            @click.native="onReplenishBalance"
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
          <UiAccordionItem
            name="history"
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
                    {{ row.createdAt | formatDate('DD.MM.YYYY') }}
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
                    {{ row.amount | price }}
                  </UiText>
                </UiTableColumn>
              </template>
            </UiTable>
          </UiAccordionItem>
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
              @input="onSubmit"
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
              @input="onSubmit"
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
              :value="remindTime"
              :options="durationList"
              required
              :clearable="false"
              placeholder="Вибрати час"
              @input="($event) => {
                settings.remindSMSMinutes = $event.value;

                onSubmit()
              }"
            >
              <template #input="{ onFocus }">
                <UiText
                  size="m"
                  responsive
                  right-icon="outlined/caret-down"
                  @click.native="onFocus"
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
            @click.native="onActivate"
          >
            Активувати
          </UiButton>
        </template>
      </Section>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_REMIND_TEMPLATE, SMS_CREATION_TEMPLATE } from '~/constants'

import { SMS_REMIND_DURATIONS } from '~/constants/time'

import { IHistoryItem } from '~/services/api'

import { debounce } from '~/utils/debounce'
import { minutesToTime } from '~/utils/time'

import { normalizeSmsSettingsParams } from '~/logics/company'

import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'

import Section from '../components/Section.vue'
import SmsTemplate from '../components/SmsTemplate.vue'
import SettingsLayout from '../components/Layout.vue'

@Component({
  layout: 'dashboard',

  components: {
    Section,
    InfoPanel,
    SmsTemplate,
    SettingsLayout
  },

  async asyncData ({ api }) {
    const { data: history } = await api.balance.history({
      offset: 0,
      limit: 20
    })

    return {
      history
    }
  },

  head () {
    return {
      title: 'Налаштування СМС - pullcrm'
    }
  }
})
export default class SmsSettingsPage extends Vue {
  readonly history: IHistoryItem[] = []

  isLoading = false

  settings = this.$typedStore.getters['sms/settings']

  constructor () {
    super()

    this.onSubmit = debounce(this.onSubmit, 200)
  }

  get balance () {
    return this.$typedStore.state.sms.balance
  }

  get isAuthorize () {
    return this.$typedStore.getters['sms/isAuthorize']
  }

  get smsRemindTemplate () {
    return this.settings.remindSMSTemplate || SMS_REMIND_TEMPLATE
  }

  get smsCreationTemplate () {
    return this.settings.creationSMSTemplate || SMS_CREATION_TEMPLATE
  }

  get remindTime () {
    return {
      name: minutesToTime(this.settings.remindSMSMinutes),
      value: this.settings.remindSMSMinutes
    }
  }

  get durationList () {
    return SMS_REMIND_DURATIONS.map(minutes => ({
      name: minutesToTime(minutes),
      value: minutes
    }))
  }

  async onSubmit () {
    try {
      await this.$api.sms.settingUpdate(
        normalizeSmsSettingsParams(this.settings)
      )
    } catch {
      this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Щось не так!'
      })
    }
  }

  async onReplenishBalance () {
    const {
      MINIMUM_DEPOSIT_AMOUNT,
      MAXIMUM_DEPOSIT_AMOUNT
    } = this.$runtimeConfig

    // TODO: Check type of result value
    const amount = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Вкажіть суму для поповнення',
      input: {
        type: 'number',
        value: MINIMUM_DEPOSIT_AMOUNT,
        min: MINIMUM_DEPOSIT_AMOUNT,
        max: MAXIMUM_DEPOSIT_AMOUNT
      },
      acceptButtonTitle: 'Поповнити'
    })

    if (amount) {
      const result = await this.$apiClient.balanceCheckout({
        amount: Number(amount)
      })

      const newWindow = window.open()

      newWindow.document.body.innerHTML = result
      newWindow.document.body.querySelector('form').submit()
    }
  }

  async onActivate () {
    try {
      this.isLoading = true

      await this.$api.sms.settingCreate({
        hasRemindSMS: true,
        hasCreationSMS: false,
        remindSMSMinutes: 60,
        remindSMSTemplate: SMS_REMIND_TEMPLATE,
        creationSMSTemplate: SMS_CREATION_TEMPLATE
      })

      window.location.reload()
    } catch {
      this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Щось не так!'
      })
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./SmsSettingsPage.scss"></style>
