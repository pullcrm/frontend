<template>
  <div class="landing-home-page-opportunities">
    <UiTitle
      size="m"
      class="landing-home-page-opportunities__title"
    >
      Можливості та переваги
    </UiTitle>

    <div class="landing-home-page-opportunities__inner">
      <Opportunity
        icon="solid/calendar-fill"
        color="#3C8AFF"
        title="Електронний календар"
        description="Створення запису, додавання запису в чергу, закриття запису"
      />

      <Opportunity
        icon="solid/moon-stars-fill"
        color="#705BCF"
        title="Онлайн запис 24/7"
        description="Завжди доступний для використання"
      />

      <Opportunity
        icon="solid/chart-bar-fill"
        color="#6ACEEE"
        title="Статистика и аналітика"
        description="Перегляд даних про записи та аналіз фінансів"
      />

      <Opportunity
        icon="solid/chat-dots-fill"
        color="#4DBD71"
        title="СМС оповіщення"
        description="Повідомте вашим клієнтам про статус запису"
      />

      <Opportunity
        icon="solid/buildings-fill"
        color="#FD983A"
        title="Безмежна кількість компаній"
        description="Керуйте філіями та співробітниками без обмежень"
      />

      <Opportunity
        icon="solid/user-circle-fill"
        color="#FDBE3A"
        title="Персональний кабінет співробітника"
        description="Перегляд записів, приклади робіт, вибір послуг"
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
