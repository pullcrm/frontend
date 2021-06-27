<template>
  <UiContainer>
    <UiPanel
      class="time-off-page"
    >
      <div class="time-off-page__header">
        <UiTitle
          size="m"
          responsive
        >
          Не рабочое время
        </UiTitle>

        <UiButton
          theme="blue"
          responsive
          @click.native="onAdd"
        >
          Закрыть запись
        </UiButton>
      </div>

      <TimeOffTable />
    </UiPanel>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import TimeOffTable from './components/Table.vue'

@Component({
  layout: 'dashboard',

  components: {
    TimeOffTable
  }
})
export default class TimeOff extends Vue {
  onAdd () {
    this.$typedStore.dispatch('popup/show', 'time-off-new')
  }
}
</script>

<style lang="scss" src="./TimeOff.scss"></style>
