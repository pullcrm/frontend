<template>
  <div class="nav-bar">
    <div class="nav-bar__list">
      <div
        class="nav-bar__logo"
        @click="$emit('on-companies')"
      >
        <img src="@/assets/company-logo.png" alt="">
      </div>

      <div class="nav-bar__hr" />

      <RouterLink
        class="nav-bar__item"
        to="/"
        v-tooltip.right-start="'Главная'"
      >
        <UiIcon
          name="home"
          size="s"
        />
      </RouterLink>

      <RouterLink
        class="nav-bar__item"
        to="/calendar"
        v-tooltip.right-start="'Календарь записей'"
      >
        <UiIcon
          name="calendar"
          size="s"
        />
      </RouterLink>

      <RouterLink
        class="nav-bar__item"
        :to="{ name: 'companyEmployee' }"
        v-tooltip.right-start="'Сотрудники компании'"
      >
        <UiIcon
          name="persones"
          size="s"
        />
      </RouterLink>

      <RouterLink
        class="nav-bar__item"
        :to="{ name: 'CompanyProcedures' }"
        v-tooltip.right-start="'Каталог услуг'"
      >
        <UiIcon
          name="folder"
          size="s"
        />
      </RouterLink>
    </div>

    <div class="nav-bar__footer">
      <RouterLink
        class="nav-bar__item"
        to="/calendar"
        v-tooltip.right-start="'Настройки'"
      >
        <UiIcon
          name="settings"
          size="s"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '@/components/Icon.vue'

@Component({
  components: {
    UiIcon
  }
})
export default class NavBar extends Vue {

}
</script>

<style lang="scss">
  .nav-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 64px;
    height: 100%;
    padding: 16px 12px;

    &__logo {
      width: 36px;
      height: 36px;
      margin: 0 auto;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    &__hr {
      width: 100%;
      height: 1px;
      margin: 16px 0;
      background: rgba(#000, 0.2);
    }

    &__list {
      .nav-bar__item {
        margin-bottom: 70px;
      }
    }

    &__item {
      display: block;
      text-align: center;

      .b-tooltip {
        display: block;
      }

      .ui-icon {
        opacity: 0.2;
      }

      &.router-link-exact-active,
      &:hover {
        .ui-icon {
          opacity: 1;
        }
      }
    }

    &__footer {
      padding-bottom: 40px;
    }
  }
</style>
