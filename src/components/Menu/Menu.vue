<template>
  <div class="menu">
    <div class="menu__list">
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
        :to="{ name: 'staff' }"
        icon="person/persones"
        title="Сотрудники"
      />

      <MenuItem
        :to="{ name: 'procedures' }"
        icon="list"
        title="Список услуг"
      />
    </div>

    <div class="menu__footer">
      <MenuItem
        :to="{ name: 'companySettings' }"
        icon="settings/setting-1"
        title="Настройки"
      />
    </div>
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

<style lang="scss">
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 64px;
    height: 100%;
    padding: 16px 0;
    box-shadow: 1px 0 0 $ui-black-20;

    &__logo {
      width: 44px;
      height: 44px;
      overflow: hidden;
      background: #000;
      border-radius: 16px;
      cursor: pointer;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    &__list {
      .menu-item {
        margin-top: 32px;
      }
    }

    &__footer {
      padding-bottom: 32px;
    }
  }
</style>
