<template>
  <div class="nav-users">
    <UiUser
      v-for="employer in employee"
      :key="employer.id"
      class="nav-users__item"
      :user="employer"
      :online="profile.id === employer.id"
    />

    <div
      class="nav-users__add"
      @click="onAddEmployee"
    >
      <UiIcon
        name="plus"
        size="s"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '@/components/Icon.vue'

import UiUser from './User.vue'

@Component({
  components: {
    UiUser,
    UiIcon
  }
})
export default class Users extends Vue {
  get profile () {
    return this.$store.state.profile.profile
  }

  get employee () {
    return this.$store.state.employee.employee
  }

  onAddEmployee () {
    this.$modal.show('add-employee')
  }
}
</script>

<style lang="scss">
  .nav-users {
    display: flex;
    justify-content: flex-end;

    &__item {
      margin-right: 8px;
    }

    &__add {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: #4339f2;
      border-radius: 50%;
      cursor: pointer;

      .ui-icon {
        filter: invert(1);
      }
    }
  }
</style>
