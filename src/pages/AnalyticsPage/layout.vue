<script lang="ts">
import dayjs from '~/utils/dayjs'

export default {
  async preFetch() {
    const startDate = dayjs().subtract(14, 'day')
    const endDate = dayjs()

    const analyticsStore = useAnalyticsStore()

    await Promise.all([
      analyticsStore.fetchFinanceStats({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      }),

      analyticsStore.fetchAppointmentsStats({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      }),
    ])

    analyticsStore.dates = [
      startDate.toDate(),
      endDate.toDate(),
    ]
  },

  setup() {
    const navigation = [
      {
        name: 'Календар',
        to: { name: 'analyticsAppointments' },
      },

      {
        name: 'Фінанси',
        to: { name: 'analyticsFinance' },
      },
    ]

    return {
      navigation,
    }
  },
}
</script>

<template>
  <div class="analytics-page-layout">
    <UiContainer>
      <UiTitle
        class="analytics-page-layout__title"
        size="l"
        responsive
      >
        Аналітика
      </UiTitle>

      <UiNavigation
        class="analytics-page-layout__navigation"
        :navigation="navigation"
      />

      <RouterView />
    </UiContainer>
  </div>
</template>

<style lang="scss" src="./layout.scss"></style>
