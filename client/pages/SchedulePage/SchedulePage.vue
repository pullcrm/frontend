<template>
  <div class="schedule-page">
    <UiContainer>
      <Header
        class="schedule-page__header"
      />

      <Schedule
        class="schedule-page__schedule"
        :loading="isLoading"
      />
    </UiContainer>

    <Portal
      v-if="isQueueOpened"
      to="sidebar"
    >
      <Queue />
    </Portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Schedule from '~/components/Schedule/Schedule.vue'

import Queue from './components/Queue.vue'
import Header from './components/Header.vue'

@Component({
  layout: 'dashboard',

  components: {
    Queue,
    Header,
    Schedule
  }
})
export default class SchedulePage extends Vue {
  get isQueueOpened (): boolean {
    return this.$typedStore.state.schedule.isQueueOpened
  }

  get isLoading () {
    return this.$typedStore.state.schedule.isLoading
  }

  async mounted () {
    const { date } = this.$route.query

    if (date) {
      this.$typedStore.commit('schedule/SET_DATE', date)
    }

    await this.$typedStore.dispatch('schedule/fetch')
  }
}
</script>

<style lang="scss" src="./SchedulePage.scss"></style>
