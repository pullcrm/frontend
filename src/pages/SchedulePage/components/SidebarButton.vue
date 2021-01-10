<template>
  <UiButton
    class="schedule-sidebar-button"
    size="m"
    theme="blue"
    right-icon="plus-fill"
  >
    {{ date | formatDate('D MMMM') }}
  </UiButton>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class SidebarButton extends Vue {
  get date () {
    return new Date(this.$store.state.schedule.date) as Date
  }
}
</script>

<style lang="scss">
  .schedule-sidebar-button {
    position: fixed;
    right: 16px;
    bottom: 72px;
    z-index: 20;
    display: none;

    @media (max-width: $ui-laptop - 1px) {
      display: flex;
    }
  }
</style>
