<script lang="ts">
import CompanyPicker from './components/CompanyPicker.vue'
import PhoneConfirmation from './components/PhoneConfirmation.vue'

import { SPECIALIST } from '~/constants/roles'

export default {
  components: {
    CompanyPicker,
    PhoneConfirmation,
  },

  async preFetch({ currentRoute }: any) {
    const slug = Number(currentRoute.params.slug)

    const specialistStore = useSpecialistStore()

    await specialistStore.fetch(slug)
    await specialistStore.fetchAvatars()
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const positionStore = usePositionStore()
    const specialistStore = useSpecialistStore()

    const navigation = computed(() => {
      return [
        {
          name: 'Інформація',
          to: {
            ...route,
            name: 'specialistInfo',
          },
        },

        {
          name: 'Журнал записів',
          to: {
            ...route,
            name: 'specialistSchedule',
          },
        },

        {
          name: 'Послуги',
          to: {
            ...route,
            name: 'specialistProcedures',
          },
        },

        {
          name: 'Графік роботи',
          to: {
            ...route,
            name: 'timetableProcedures',
          },
        },

        {
          name: 'Налаштування',
          to: {
            ...route,
            name: 'specialistSettings',
          },
        },
      ].filter(Boolean)
    })

    const specialist = computed(() => {
      return specialistStore.specialist
    })

    const role = computed(() => {
      return positionStore.role
    })

    const hasBack = computed(() => {
      return role.value.name !== SPECIALIST
    })

    async function onBack() {
      await router.push({ name: 'specialists' })
    }

    return {
      navigation,
      specialist,
      onBack,
      hasBack,
    }
  },
}
</script>

<template>
  <div class="specialist-page-layout">
    <div class="specialist-page-layout__header">
      <UiContainer narrow>
        <UiBack
          v-if="hasBack"
          class="specialist-page-layout__back"
          @click="onBack"
        />

        <UiTitle
          class="specialist-page-layout__title"
          size="l"
          responsive
        >
          {{ specialist.user.fullName }}
        </UiTitle>

        <PhoneConfirmation
          :specialist="specialist"
          class="specialist-page-layout__phone-confirmation"
        />

        <CompanyPicker
          class="specialist-page-layout__company-picker"
        />

        <UiNavigation
          class="specialist-page-layout__navigation"
          :navigation="navigation"
        />
      </UiContainer>
    </div>

    <UiContainer narrow>
      <RouterView />
    </UiContainer>
  </div>
</template>

<style lang="scss" src="./layout.scss"></style>
