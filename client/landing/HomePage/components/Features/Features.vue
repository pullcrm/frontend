<template>
  <div class="landing-home-page-features">
    <div class="landing-home-page-features__panel">
      <UiTabs
        size="l"
        responsive
        initial-tab="schedule"
        class="landing-home-page-features__tabs"
      >
        <UiTabBody
          key="schedule"
          icon="solid/calendar-fill"
          title="Электронный календарь"
        >
          <FeatureItem
            :image="require('~/assets/images/features-schedule.png')"
            title="Pullcrm-features"
          />
        </UiTabBody>

        <UiTabBody
          key="appointment"
          icon="solid/plus-circle-fill"
          title="Создание записи"
        >
          dgdrg
        </UiTabBody>

        <UiTabBody
          key="analytics"
          icon="solid/chart-bar-fill"
          title="Аналитика"
        >
          dgdrgdrg
        </UiTabBody>
      </UiTabs>
    </div>

    <UiText
      size="l"
      strong
      responsive
      class="landing-home-page-features__disclaimer"
    >
      Все функции Pullcrm доступны абсолютно бесплатно!
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import FeatureItem from './FeatureItem.vue'

@Component({
  components: {
    FeatureItem
  }
})
export default class Features extends Vue {}
</script>

<style lang="scss" src="./Features.scss"></style>
