<script lang="ts" setup>
import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'
import { formatMoney } from '~/utils/money'
import { apiClient } from '~/boot/api'

const smsStore = useSmsStore()
const popupStore = usePopupStore()

const balance = computed(() => {
  return smsStore.balance
})

async function onReplenishBalance() {
  const MINIMUM_DEPOSIT_AMOUNT = process.env.MINIMUM_DEPOSIT_AMOUNT
  const MAXIMUM_DEPOSIT_AMOUNT = process.env.MAXIMUM_DEPOSIT_AMOUNT

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

    // TODO: This not working with capacitor
    const newWindow: any = window.open()

    newWindow.document.body.innerHTML = result
    newWindow.document.body.querySelector('form').submit()
  }
}
</script>

<template>
  <InfoPanel
    class="balance-panel"
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
</template>
