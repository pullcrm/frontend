<template>
  <div class="schedule-calendar-header">
    <div class="schedule-calendar-header__specialists">
      <Specialist
        v-for="specialist in specialists"
        :key="specialist.id"
        :specialist="specialist"
      />
    </div>

    <UiButton
      class="schedule-calendar-header__add-more"
      theme="green"
      left-icon="person/add"
      size="l"
      @click.native="addSpecialist"
    >
      Добавить сотрудника
    </UiButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Specialist from './Specialist.vue'

@Component({
  components: {
    Specialist
  }
})
export default class Header extends Vue {
  get specialists () {
    return this.$store.state.employee.specialists
  }

  addSpecialist () {
    this.$store.dispatch('popup/show', 'specialist-new')
  }
}
</script>

<style lang="scss">
  .schedule-calendar-header {
    @include hide-scrollbar();

    display: flex;
    height: 68px;
    border-bottom: 1px solid $ui-black-60;

    &__specialists {
      display: flex;
    }

    &__add-more {
      flex: 1;
      min-width: 218px;
      white-space: nowrap;

      &.ui-button_size_l {
        height: 67px;
        border-radius: 0;
      }
    }
  }
</style>
