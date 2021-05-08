<template>
  <div class="landing-home-page-opportunities">
    <UiTitle
      size="m"
      responsive
      class="landing-home-page-opportunities__title"
    >
      Возможности и преимущества
    </UiTitle>

    <div class="landing-home-page-opportunities__inner">
      <Opportunity
        icon="solid/calendar-fill"
        color="#3C8AFF"
        title="Электронный календарь"
        description="Создание записи, добавление записи в очередь, закрытие записи"
      />

      <Opportunity
        icon="solid/moon-stars-fill"
        color="#705BCF"
        title="Онлайн запись 24/7"
        description="Всегда доступен для использования"
      />

      <Opportunity
        icon="solid/chart-bar-fill"
        color="#6ACEEE"
        title="Статистика и аналитика"
        description="Просмотр данных о записях и анализ финансов"
      />

      <Opportunity
        icon="solid/chat-dots-fill"
        color="#4DBD71"
        title="СМС оповещения"
        description="Сообщите вашим клиентам о записи"
      />

      <Opportunity
        icon="solid/buildings-fill"
        color="#FD983A"
        title="Безграничное количество компаний"
        description="Управляйте филиалами и сотрудниками без ограничений"
      />

      <Opportunity
        icon="solid/user-circle-fill"
        color="#FDBE3A"
        title="Персональный кабинет сотрудника"
        description="Просмотр записей, примеры работ, выбор услуг"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Opportunity from './Opportunity.vue'

@Component({
  components: {
    Opportunity
  }
})
export default class Opportunities extends Vue {}
</script>

<style lang="scss" src="./Opportunities.scss"></style>
