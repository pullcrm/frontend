<template>
  <div class="menu">
    <div
      class="menu__logo"
    >
      <img src="@/assets/logo.png">
    </div>

    <MenuItem
      :to="{ name: 'dashboard' }"
      icon="home"
      title="Главная"
    />

    <MenuItem
      :to="{ name: 'schedule' }"
      icon="calendar"
      title="Календарь записей"
    />

    <MenuItem
      :to="{ name: 'timeOff' }"
      icon="clock"
      title="Не рабочое время"
    />

    <MenuItem
      :to="{ name: 'specialists' }"
      icon="person/persones"
      title="Сотрудники"
    />

    <MenuItem
      :to="{ name: 'procedures' }"
      icon="list"
      title="Список услуг"
    />

    <div class="menu__space" />

    <MenuItem
      :to="{ name: 'companySettings' }"
      icon="settings/setting-1"
      title="Настройки"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import MenuItem from './MenuItem.vue'

@Component({
  components: {
    MenuItem
  }
})
export default class Menu extends Vue {

}
</script>

<style lang="scss" src="./Menu.scss"></style>
