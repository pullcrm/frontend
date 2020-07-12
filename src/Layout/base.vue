<template>
  <div class="base-layout">
    <div
      class="base-layout__inner"
      :class="{'_has-companies' : showCompanies}"
    >
      <div class="base-layout__nav">
        <!-- TODO: add js slide <transition /> and remove css animation -->
        <Companies
          :class="{'_has-companies' : showCompanies}"
        />

        <NavMenu
          @on-companies="showCompanies = !showCompanies"
        />
      </div>

      <div class="base-layout__container">
        <slot
          name="header"
        >
          <UiContainer>
            <div class="base-layout__header">
              <RouterLink
                class="base-layout__help"
                to="/"
              >
                <UiIcon
                  name="mark-circle"
                  size="s"
                />

                <p>Центр помощи</p>
              </RouterLink>

              <Users
                class="base-layout__users"
              />
            </div>
          </UiContainer>
        </slot>

        <slot />
      </div>
    </div>

    <slot name="modals" />

    <AddEmployeePopup />
    <AddServicePopup />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Users from '@/components/Users/Users.vue'
import UiIcon from '@/components/Icon.vue'
import NavMenu from '@/components/NavBar/NavBar.vue'
import UiContainer from '@/components/Container.vue'
import AddServicePopup from '@/components/Popups/AddService/AddService.vue'
import AddEmployeePopup from '@/components/Popups/AddEmployee.vue'

import Companies from './components/Companies.vue'

@Component({
  components: {
    Users,
    UiIcon,
    NavMenu,
    Companies,
    UiContainer,
    AddServicePopup,
    AddEmployeePopup
  }
})
export default class BaseLayout extends Vue {
  showCompanies = false
}
</script>

<style lang="scss">
  .base-layout {
    &__inner {
      padding-left: 64px;
      transition: padding $ui-transition;

      &._has-companies {
        padding-left: 364px;
      }
    }

    &__nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      display: flex;
      background: #fff;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;
    }

    &__users {
      flex: 1;
    }

    &__help {
      @include ui-typo-14;

      display: flex;
      align-items: center;
      color: $ui-black;

      .ui-icon {
        margin-right: 8px;
      }
    }
  }
</style>
